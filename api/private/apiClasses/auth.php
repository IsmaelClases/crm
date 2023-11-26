<?php

// require_once('interfaces/crud.php');
require_once('../conn.php');
require_once('./Classes/custom_php_mailer.php');

class Auth extends Conexion  {

    public  $status = false;
    public  $message = NULL;
    public  $data = NULL;
    private $datos_usuarios;
    private $accion;
    private $opcion;
    private $grupo;
    private $user_email;
    private $usuario;
    const SEED = "An[oojlHxsBnqD=FwiP[k[L3YRv@ei|M=}|SZ}~qynM~Gc8p3x0L1Yxs[dtB";

    function __construct (){
        parent::__construct();
   }

    public function checkUsuario($token, $ruta_seleccionada) {
        try {
            $sql = $this->conexion->prepare("SELECT accion FROM sgi_vista_rol_menu WHERE accion = :ruta_seleccionada AND id_rol = (SELECT id_rol FROM sgi_usuarios WHERE token_sesion = :token)");
            $sql->bindParam(":token", $token, PDO::PARAM_STR);
            $sql->bindParam(":ruta_seleccionada", $ruta_seleccionada, PDO::PARAM_STR);
            $exito = $sql->execute();

            if ($exito) {
                $opcionCheck = $sql->fetch(PDO::FETCH_ASSOC);
            }

            if ($opcionCheck) {
                $this->status = true;
            }
        } catch(PDOException $error) {
            //$this->conexion->generateLog(2, $error, $usuario);
            $this->message = 'error';
        }
        $this->closeConnection();

    }

    public function doLogin($user, $password) {
        //$log = new log();
        $this->getDatosUsuarios($user, $password);
        if($this->datos_usuarios["usuario"] == $user and $user){

            if ($this->datos_usuarios["habilitado"] == 1) {
                try{
                    $random = rand(1000000, 9999999);

                    $token_user = $this->datos_usuarios["id_usuario"].$this->datos_usuarios["usuario"].$random;
                    $authorization = new Authorization();
                    $authorization->encryptToken($token_user, self::SEED);

                    $sql = $this->conexion->prepare("UPDATE sgi_usuarios SET token_sesion = :token_sesion WHERE id_usuario = :id_usuario");
                    $sql->bindParam(":token_sesion", $authorization->token_encrypt);
                    $sql->bindParam(":id_usuario", $this->datos_usuarios["id_usuario"]);
                    $sql->execute();

                    $this->getOpcionGrupoAccion();

                    $this->data = [
                        "usuario" =>  $this->datos_usuarios["usuario"],
                        "id_rol" =>  $this->datos_usuarios["id_rol"],
                        "rol" =>  $this->datos_usuarios["rol"],
                        "token" =>  $authorization->token_encrypt,
                        "nombre_publico" =>  $this->datos_usuarios["nombre_publico"],
                        "opcion" =>  $this->opcion,
                        "grupo" =>  $this->grupo,
                        "accion" =>  $this->accion
                     ];
                    //$log->generateLog(1, "login con éxito",$user);
                } catch(PDOException $error) {
                    //$this->conexion->generateLog(2, $error, $usuario);
                    $this->message = 'error';
                }

            } else {
                //$log->generateLog(1, "intento de login de usuario inhabilitado", $user);
                $this->data["valido"] = 0;
            }

        }else{
            //$log->generateLog( 1, "login fallido", $user);
            $this->data["valido"] = 1;
        }
        $this->status = true;

        $this->closeConnection();

    }

    public function recoverPassword($data) {

        $username = $data['username'];
        if ($username) {

            $this->getUserEmail($username);
            try{
                if ($this->user_email) {

                    $token_password_hashed = md5(time()+rand(0, time()));
                    $sql = $this->conexion->prepare("UPDATE sgi_usuarios SET token_passwd = :token_passwd, token_passwd_expira = DATE_ADD(NOW(), INTERVAL 1 DAY) WHERE usuario = :email");
                    $sql->bindParam(":token_passwd", $token_password_hashed, PDO::PARAM_STR);
                    $sql->bindParam(":email", $this->user_email, PDO::PARAM_STR);
                    $exito = $sql->execute();

                    if ($exito) {
                        $mail = new CustomPHPMailer();
                        $mail->AddAddress($this->user_email);
                        try {
                            $mail->loadTemplateRecoverPassword($token_password_hashed);
                            $resultado_mail = $mail->send();
                            if ($resultado_mail) {
                                $this->status = true;
                            }
                        } catch (Exception $e) {
                            $this->message = 'error';
                        }
                    }

                } else {
                    $this->message = "Usuario inexistente";
                }
            }catch(PDOException $error) {
                //$this->conexion->generateLog(2, $error, $usuario);
                $this->message = 'error';
            }
        }
        $this->closeConnection();
    }

    public function changePassword($data) {
        // $log = new log();
        $token_passwd = $data['token_pwd'];
        $pass = $data['password'];
        $confirm_pass = $data['confirm_password'];

        if ($pass === $confirm_pass) {


            if ($this->checkTokenPasswordIsValid($token_passwd)) {
                try {
                    $pass_hashed = md5($pass);
                    $sql = $this->conexion->prepare("UPDATE sgi_usuarios SET pass_user = :pass_user, token_passwd_expira = null WHERE token_passwd = :token_passwd");
                    $sql->bindParam(":pass_user", $pass_hashed, PDO::PARAM_STR);
                    $sql->bindParam(":token_passwd", $token_passwd, PDO::PARAM_STR);
                    $exito = $sql->execute();

                    // $log->generateLog( 1, "password cambiada", $this->usuario);

                    if ($exito) {
                        $this->status = true;
                        $this->message = 'Password cambiada correctamente';
                    }
                } catch(PDOException $error) {
                    //$this->conexion->generateLog(2, $error, $usuario);
                    $this->message = 'error';
                }

            } else $this->message = NO_TOKEN_MESSAGE;
        } else $this->message = CONTRASEÑAS_NO_COINCIDEN;

        $this->closeConnection();
    }

    public function checkTokenPassword($token) {


        if($token){
            $this->status = $this->checkTokenPasswordIsValid($token);
        } else $this->message = NO_TOKEN_MESSAGE;

        $this->closeConnection();
    }

    private function getDatosUsuarios($user, $password) {

        $password = md5($password);
        try {
            $sql = $this->conexion->prepare("SELECT *,(SELECT COUNT(id_rol) AS checked  FROM `sgi_rol_menu` WHERE `id_rol` =  U.id_rol ) AS checked
            FROM `sgi_usuarios` U inner join sgi_roles using(id_rol) WHERE usuario = :user AND pass_user = :pass");

            $sql->bindParam(":user", $user);
            $sql->bindParam(":pass", $password);

            $sql->execute();
            $this->datos_usuarios = $sql->fetch(PDO::FETCH_ASSOC);
        } catch(PDOException $error) {
            //$this->conexion->generateLog(2, $error, $usuario);
            $this->message = 'error';
        }
        // $this->closeConnection();
    }

    private function getOpcionGrupoAccion() {
        try {
            $sql = $this->conexion->prepare("SELECT opcion, grupo, accion FROM sgi_roles inner join sgi_vista_rol_menu USING(id_opcion_menu) WHERE sgi_roles.id_rol = :id_rol GROUP by opcion, grupo, accion");
            $sql->bindParam(":id_rol", $this->datos_usuarios["id_rol"]);
            $sql->execute();
            $vistas = $sql->fetch(PDO::FETCH_ASSOC);

            $this->accion = $vistas["accion"];
            $this->opcion = $vistas["opcion"];
            $this->grupo = $vistas["grupo"];
        } catch(PDOException $error) {
            $this->message = 'error';
        }
        // $this->closeConnection();
    }

    private function getUserEmail($username) {
        try {
            $sql = $this->conexion->prepare("SELECT usuario FROM sgi_usuarios WHERE usuario = :username");
            $sql->bindParam(":username", $username, PDO::PARAM_STR);

            $sql->execute();
            $this->user_email = $sql->fetch(PDO::FETCH_ASSOC)['usuario'];
        } catch(PDOException $error) {
            //$this->conexion->generateLog(2, $error, $usuario);
            $this->message = 'error';
        }
        // $this->closeConnection();
    }

    private function checkTokenPasswordIsValid($token_passwd) {
        $response = false;

        try {
            $sql = $this->conexion->prepare("SELECT usuario, UNIX_TIMESTAMP(`token_passwd_expira`) AS token_passwd_expira FROM sgi_usuarios WHERE token_passwd = :token_passwd");
            $sql->bindParam(":token_passwd", $token_passwd, PDO::PARAM_STR);

            $exito = $sql->execute();

            if ($exito) {
                $datos = $sql->fetch(PDO::FETCH_ASSOC);
                $token_passwd_expira = $datos['token_passwd_expira'];
                $this->usuario = $datos['usuario'];

                $response = time() < $token_passwd_expira;
            }
        } catch(PDOException $error) {
            //$this->conexion->generateLog(2, $error, $usuario);
            $this->message = 'error';
        }
        // $this->closeConnection();
        return $response;
    }

}

?>
