<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");
header('Content-type:application/json;charset=utf-8'); 

require_once('../db_conn.php');
$datos = json_decode(file_get_contents('php://input'), true);


$email = $datos['email'];

if ($email) {
    $sql = $DBH->prepare("SELECT ap_usuarios.correo_electronico FROM ap_usuarios WHERE `correo_electronico`=:correo_electronico");
    $sql->bindParam(":correo_electronico", $email, PDO::PARAM_STR);

    if ($sql->execute()) $email_bbdd = $sql->fetch(PDO::FETCH_ASSOC)['correo_electronico'];
    $sql = null;

    if ($email_bbdd) {

        $sql_firma = $DBH->prepare("SELECT dato FROM ap_master WHERE campo = 'firma_correo'");
        $resultado = $sql_firma->execute();
        $query = $sql_firma->fetch(PDO::FETCH_ASSOC);
        $firma = $query['dato'];

        // generamos hash temporal como token de recuperacion y añadimos fecha de expiracion para 24h
        $token_password_hashed = md5(time()+rand(0, time()));
        $sql = $DBH->prepare("UPDATE ap_usuarios SET token_passwd = :tkn_pwd, token_passwd_expira = DATE_ADD(NOW(), INTERVAL 1 DAY) WHERE correo_electronico = :correo_electronico");
        $sql->bindParam(":tkn_pwd", $token_password_hashed, PDO::PARAM_STR);
        $sql->bindParam(":correo_electronico", $email_bbdd, PDO::PARAM_STR);
        $exito = $sql->execute();
        // cargamos el script, en otro fichero para que sea más depurable
        if ($exito){
            include_once('enviar_email_pwd.php');
        }
    } else echo json_encode("error");
} else echo json_encode("error");

?>