<?php

require_once('./apiClasses/zona.php');

$api_utils = new ApiUtils();
$api_utils->setHeaders($api_utils::ALL_HEADERS);
$api_utils->displayErrors();

$authorization = new Authorization();
$authorization->comprobarToken();

$request = json_decode(file_get_contents("php://input"), true);

$zona = new Zona();

if (isset($_GET["id"])) {
    $id = $_GET["id"];
}

if ($authorization->token_valido) {
    switch ($_SERVER['REQUEST_METHOD']) {
        case $api_utils::GET:
            $zona->get();
            break;
            
        case $api_utils::POST:
            $zona->create($request);
            break;
            
        case $api_utils::PUT:
            $zona->update($request);
            break;
            
        case $api_utils::DELETE:
            $zona->delete($id);
            break;

        default:
    }
} else $zona->message = NO_TOKEN_MESSAGE;

$api_utils->response($zona->status, $zona->message, $zona->data, $authorization->permises);
echo json_encode($api_utils->response, JSON_PRETTY_PRINT);

?>