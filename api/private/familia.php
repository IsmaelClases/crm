<?php

require_once('./apiClasses/familia.php');

$api_utils = new ApiUtils();
$api_utils->setHeaders($api_utils::ALL_HEADERS);
$api_utils->displayErrors();

$authorization = new Authorization();
$authorization->comprobarToken();

$request = json_decode(file_get_contents("php://input"), true);

$familia = new Familia();

if (isset($_GET["id"])) {
    $id = $_GET["id"];
}

if ($authorization->token_valido) {
    switch ($_SERVER['REQUEST_METHOD']) {
        case $api_utils::GET:
            $familia->get();
            break;
            
        case $api_utils::POST:
            $familia->create($request);
            break;
            
        case $api_utils::PUT:
            $familia->update($request);
            break;
            
        case $api_utils::DELETE:
            $familia->delete($id);
            break;

        default:
    }
} else $familia->message = NO_TOKEN_MESSAGE;

$api_utils->response($familia->status, $familia->message, $familia->data, $authorization->permises);
echo json_encode($api_utils->response, JSON_PRETTY_PRINT);

?>