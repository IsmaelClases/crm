<?php

require_once('./apiClasses/modo_reunion.php');

$api_utils = new ApiUtils();
$api_utils->setHeaders($api_utils::ALL_HEADERS);
$api_utils->displayErrors();

$authorization = new Authorization();
$authorization->comprobarToken();

$request = json_decode(file_get_contents("php://input"), true);

$modo_reunion = new ModoReunion();

if (isset($_GET["id"])) {
    $id = $_GET["id"];
}

if ($authorization->token_valido) {
    switch ($_SERVER['REQUEST_METHOD']) {
        case $api_utils::GET:
            $modo_reunion->get();
            break;
            
        case $api_utils::POST:
            $modo_reunion->create($request);
            break;
            
        case $api_utils::PUT:
            $modo_reunion->update($request);
            break;
            
        case $api_utils::DELETE:
            $modo_reunion->delete($id);
            break;

        default:
    }
} else $modo_reunion->message = NO_TOKEN_MESSAGE;

$api_utils->response($modo_reunion->status, $modo_reunion->message, $modo_reunion->data, $authorization->permises);
echo json_encode($api_utils->response, JSON_PRETTY_PRINT);

?>