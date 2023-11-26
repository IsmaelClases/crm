<?php

require_once('./apiClasses/nivel.php');

$api_utils = new ApiUtils();
$api_utils->setHeaders($api_utils::ALL_HEADERS);
$api_utils->displayErrors();

$authorization = new Authorization();
$authorization->comprobarToken();

$request = json_decode(file_get_contents("php://input"), true);

$nivel = new Nivel();

if (isset($_GET["id"])) {
    $id = $_GET["id"];
}

if ($authorization->token_valido) {
    switch ($_SERVER['REQUEST_METHOD']) {
        case $api_utils::GET:
            $nivel->get();
            break;
            
        case $api_utils::POST:
            $nivel->create($request);
            break;
            
        case $api_utils::PUT:
            $nivel->update($request);
            break;
            
        case $api_utils::DELETE:
            $nivel->delete($id);
            break;

        default:
    }
} else $nivel->message = NO_TOKEN_MESSAGE;

$api_utils->response($nivel->status, $nivel->message, $nivel->data, $authorization->permises);
echo json_encode($api_utils->response, JSON_PRETTY_PRINT);

?>