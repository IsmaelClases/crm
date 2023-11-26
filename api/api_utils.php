<?php

require_once('text.php');

class ApiUtils {
    const GET               = "GET";
    const POST              = "POST";
    const DELETE            = "DELETE";
    const PUT               = "PUT";
    const ALL_HEADERS       = "ALL_HEADERS";
    // const NO_TOKEN_MESSAGE  = "El token no es válido";
    public $response;

    public function setHeaders($method) {

        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Credentials: true");
        header("Access-Control-Max-Age: 1000");
        header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
        if ($method === self::ALL_HEADERS) {
            header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        } else {
            header("Access-Control-Allow-Methods: ".$method.", OPTIONS");
        }
        header('Content-type:application/json;charset=utf-8');

    }

    public function displayErrors() {
        ini_set('display_errors', 1);
        ini_set('display_startup_errors', 1);
        error_reporting(E_ALL);
    }

    public function response($status, $message, $data, $permises = null) {
        $this->response = [
            "ok" => $status,
            "message" => $message,
            "data" => $data,
            "permises" => $permises
        ];
    }
}

?>