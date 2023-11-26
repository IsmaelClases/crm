<?php

require_once('./apiClasses/asistente.php');

$api_utils = new ApiUtils();
$api_utils->setHeaders($api_utils::ALL_HEADERS);
$api_utils->displayErrors();

$authorization = new Authorization();
$authorization->comprobarToken();

$request = json_decode(file_get_contents("php://input"), true);

$asistente = new Asistente();

if (isset($_GET["id"])) {
    $id = $_GET["id"];
}

if ($authorization->token_valido) {
    switch ($_SERVER['REQUEST_METHOD']) {
        case $api_utils::GET:
            $asistente->get();
            break;
            
        case $api_utils::POST:
            $asistente->create($request);
            break;
            
        case $api_utils::PUT:
            $asistente->update($request);
            break;
            
        case $api_utils::DELETE:
            $asistente->delete($id);
            break;

        default:
    }
} else $asistente->message = NO_TOKEN_MESSAGE;

$api_utils->response($asistente->status, $asistente->message, $asistente->data, $authorization->permises);
echo json_encode($api_utils->response, JSON_PRETTY_PRINT);

?>