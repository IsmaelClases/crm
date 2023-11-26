<?php

require_once('./apiClasses/tipo_contacto.php');

$api_utils = new ApiUtils();
$api_utils->setHeaders($api_utils::ALL_HEADERS);
$api_utils->displayErrors();

$authorization = new Authorization();
$authorization->comprobarToken();

$request = json_decode(file_get_contents("php://input"), true);

$tipo_contacto = new TipoContacto();

if (isset($_GET["id"])) {
    $id = $_GET["id"];
}

if ($authorization->token_valido) {
    switch ($_SERVER['REQUEST_METHOD']) {
        case $api_utils::GET:
            $tipo_contacto->get();
            break;
            
        case $api_utils::POST:
            $tipo_contacto->create($request);
            break;
            
        case $api_utils::PUT:
            $tipo_contacto->update($request);
            break;
            
        case $api_utils::DELETE:
            $tipo_contacto->delete($id);
            break;

        default:
    }
} else $tipo_contacto->message = NO_TOKEN_MESSAGE;

$api_utils->response($tipo_contacto->status, $tipo_contacto->message, $tipo_contacto->data, $authorization->permises);
echo json_encode($api_utils->response, JSON_PRETTY_PRINT);

?>