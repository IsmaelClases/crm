<?php

require_once('./apiClasses/motivo_reunion.php');

$api_utils = new ApiUtils();
$api_utils->setHeaders($api_utils::ALL_HEADERS);
$api_utils->displayErrors();

$authorization = new Authorization();
$authorization->comprobarToken();

$request = json_decode(file_get_contents("php://input"), true);

$motivo_reunion = new MotivoReunion();

if (isset($_GET["id"])) {
    $id = $_GET["id"];
}

if ($authorization->token_valido) {
    switch ($_SERVER['REQUEST_METHOD']) {
        case $api_utils::GET:
            $motivo_reunion->get();
            break;
            
        case $api_utils::POST:
            $motivo_reunion->create($request);
            break;
            
        case $api_utils::PUT:
            $motivo_reunion->update($request);
            break;
            
        case $api_utils::DELETE:
            $motivo_reunion->delete($id);
            break;

        default:
    }
} else $motivo_reunion->message = NO_TOKEN_MESSAGE;

$api_utils->response($motivo_reunion->status, $motivo_reunion->message, $motivo_reunion->data, $authorization->permises);
echo json_encode($api_utils->response, JSON_PRETTY_PRINT);

?>