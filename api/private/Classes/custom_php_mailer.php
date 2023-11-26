<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// require_once('../conn.php');
require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

class CustomPHPMailer extends PHPMailer {


    private $conexion;
    private $datos_email;

    function __construct() {

        $this->conexion = new Conexion();
        $this->datos_email = (json_decode($this->conexion->getConfig('data_email_passwd'), true));
        // 2. validacion SMTP
        $this->IsSMTP();
        $this->SMTPDebug  = 0;
        $this->SMTPAuth = true;
        $this->Host = $this->datos_email['host']; // SMTP a utilizar. Por ej. smtp.elserver.com
        $this->Username = $this->datos_email['email']; // Correo completo a utilizar
        $this->Password = $this->datos_email['passwd']; // Contraseña
        $this->SMTPSecure = 'tls'; 
        $this->CharSet = 'UTF-8';
        $this->isHTML(true);
        $this->Port = $this->datos_email['port']; // Puerto a utilizar
        $this->setFrom($this->datos_email['email'], $this->datos_email['sender']); // desde donde enviamos
    }

    /**
     * Prepara el correo para recuperar una contraseña
     *
     */
    function loadTemplateRecoverPassword($token_password_hashed) {
        $this->Subject = 'Cambio de contraseña en '.$this->conexion::APP_NAME;
        $this->Subject = utf8_decode($this->Subject);

        $this->Body = '<div><strong>Estimado usuario, </strong><br /><br />';
        $this->Body .= 'Este email fue generado automáticamente a razón de su solicitud de cambio de contraseña para acceder a la aplicación <span style="color:#1f4e79"><strong> '.$this->conexion::APP_NAME.' </strong></span><br /><br />';
        $this->Body .= '<a href="'.$this->conexion::URL.'?token='.$token_password_hashed.'">'.$this->conexion::URL.'?token='. $token_password_hashed.'</a><br /><br />';
        $this->Body .= 'Si no ha solicitado reestablecer su contraseña, por favor, ignore este email.<br /><br /> Gracias por su colaboración.<br /><br /><br /></div>';

        $this->Body = utf8_decode($this->Body);
    }
 
}


?>