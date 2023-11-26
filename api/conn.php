<?php

ini_set('session.gc_maxlifetime', 3600);
session_start();
setlocale(LC_ALL, 'es_ES');

require_once('utils.php');
require_once('api_utils.php');

class Conexion {

    const DB_HOST = 'localhost';
    const DB_USERNAME = 'root';
    const DB_PASSWORD = 'Dolibar*1';
    const DB_NAME = 'app_radfpd';
    const DB_PORT = '3306';

    const URL = '';
    const APP_NAME = 'CRM RADFPD';
    public $conexion;
    public $id_privilegio;
    public $id_usuario;


    function __construct (){
        $this->conectar();
        $this->setVariablesSession();
   }

    private function conectar() {
        $this->conexion = new PDO("mysql:host=".self::DB_HOST.";dbname=".self::DB_NAME."", self::DB_USERNAME, self::DB_PASSWORD, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
        $this->conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    private function setVariablesSession() {
        if (isset($_SESSION['id_privilegio'])) {
            $this->id_privilegio = $_SESSION['id_privilegio'];
        }

        if (isset($_SESSION['id_usuario'])) {
            $this->id_usuario = $_SESSION['id_usuario'];
        }
    }

    public function getConfig($dato) {
        $stmt = $this->conexion->prepare("SELECT valor FROM sgi_config WHERE dato = :dato");
        $stmt->bindParam(":dato", $dato);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC)['valor'];
        $stmt->close();
    }

    public function closeConnection() {
        $this->conexion = NULL;
    }

    public function trimIfString($value) {
        return is_string($value) ? trim($value) : $value;
    }

}

class Authorization extends Conexion {

    /**
 * Get header Authorization
 * */

    public $id_usuario = NULL;
    public $token_valido = false;
    public $token = NULL;
    public $token_encrypt;
    public $is_admin;
    public $have_permision = false;
    private $id_rol = null;
    // public $permiso_post = false;
    // public $permiso_put = false;
    // public $permiso_delete = false;
    public $permises = null;

    function __construct (){
        parent::__construct();
   }

    private function getAuthorizationHeader() {
        $headers = null;
        if (isset($_SERVER['Authorization'])) {
            $headers = trim($_SERVER["Authorization"]);
        }
        else if (isset($_SERVER['HTTP_AUTHORIZATION'])) { //Nginx or fast CGI
            $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
        } elseif (function_exists('apache_request_headers')) {
            $requestHeaders = apache_request_headers();
            $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
            if (isset($requestHeaders['Authorization'])) {
                $headers = trim($requestHeaders['Authorization']);
            }
        }
        return $headers;
    }

    /**
    * get access token from header
    * */
    private function getBearerToken() {
        $headers = $this->getAuthorizationHeader();
        if (!empty($headers)) {
            if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
                $this->token = $matches[1];
            }
        }
    }

    public function comprobarToken() {

        $this->getBearerToken();

        $stmt = $this->conexion->prepare("SELECT * FROM sgi_usuarios WHERE token_sesion = :token_sesion");
        $stmt->bindParam(":token_sesion", $this->token);
        $stmt->execute();
        $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($resultado) {
            $this->id_usuario = $resultado["id_usuario"];
            $this->token_valido = true;
        }
    }


    /**
     * Comprueba si un usuario es superAdmin
     * atraves de una consulta mediante el token
     */
    public function isAdmin(){
       $this->getIdRol();

        if($this->id_rol == '1'){
            $this->is_admin = true;
        } else{
            $this->is_admin = false;
        }
    }

    public function havePermision($method, $route){
        $this->isAdmin();

        $query = null;

        $api_utils = new ApiUtils();

        if ($this->id_rol) {
            if($this->is_admin){
                $this->have_permision = true;
            } else {
                switch ($method) {
                    case $api_utils::GET:
                        $this->have_permision = true;
                        break;
                    case $api_utils::POST:
                        $query = "SELECT permiso_post as permiso from sgi_vista_rol_menu where id_rol = :id_rol and accion = :route";
                        break;
                    case $api_utils::PUT:
                        $query = "SELECT permiso_put as permiso from sgi_vista_rol_menu where id_rol = :id_rol and accion = :route";
                        break;
                    case $api_utils::DELETE:
                        $query = "SELECT permiso_delete as permiso from sgi_vista_rol_menu where id_rol = :id_rol and accion = :route";
                        break;
                    default:
                }

                if ($query) {
                    $sql = $this->conexion->prepare($query);
                    $sql->bindParam(":id_rol", $this->id_rol);
                    $sql->bindParam(":route", $route);

                    $sql->execute();

                    $permise = $sql->fetch(PDO::FETCH_ASSOC)["permiso"];

                    if ($permise == '1') {
                        $this->have_permision = true;
                    }
                }
            }
        }
    }

    public function getPermision($route) {
        // $this->getIdRol();

        $this->isAdmin();

        $sql = $this->conexion->prepare("SELECT permiso_post, permiso_put, permiso_delete from sgi_vista_rol_menu where id_rol = :id_rol and accion = :route");
        $sql->bindParam(":id_rol", $this->id_rol);
        $sql->bindParam(":route", $route);
        $sql->execute();

        $permises = $sql->fetch(PDO::FETCH_ASSOC);
        $this->setPermises($permises);

        // $this->permiso_post = $sql->fetch(PDO::FETCH_ASSOC)["permiso_post"];
        // $this->permiso_put = $sql->fetch(PDO::FETCH_ASSOC)["permiso_put"];
        // $this->permiso_delete = $sql->fetch(PDO::FETCH_ASSOC)["permiso_delete"];
        //
    }

    private function getIdRol() {
        $sql = $this->conexion->prepare("SELECT id_rol FROM sgi_usuarios WHERE token_sesion = :token");
        $sql->bindParam(":token", $this->token);
        $sql->execute();
        $this->id_rol = $sql->fetch(PDO::FETCH_ASSOC)["id_rol"];
    }

    private function setPermises($permises) {
        $this->permises = [
            "add" => $permises["permiso_post"] === "1" || $this->is_admin,
            "edit" => $permises["permiso_put"] === "1" || $this->is_admin,
            "delete" => $permises["permiso_delete"] === "1" || $this->is_admin
        ];
    }

    public function encryptToken($string, $seed) {
        $result = '';
        for($i=0; $i<strlen($string); $i++) {
            $char = substr($string, $i, 1);
            $keychar = substr($seed, ($i % strlen($seed))-1, 1);
            $char = chr(ord($char)+ord($keychar));
            $result.=$char;
        }
        $this->token_encrypt = base64_encode($result);
    }
}

?>
