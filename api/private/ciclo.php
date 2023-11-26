<?php

require_once('./apiClasses/ciclo.php');

$api_utils = new ApiUtils();
$api_utils->setHeaders($api_utils::ALL_HEADERS);
$api_utils->displayErrors();

$authorization = new Authorization();
$authorization->comprobarToken();

$request = json_decode(file_get_contents("php://input"), true);

$ciclo = new Ciclo();

if (isset($_GET["id"])) {
    $id = $_GET["id"];
}

if ($authorization->token_valido) {
    switch ($_SERVER['REQUEST_METHOD']) {
        case $api_utils::GET:
            $ciclo->get();
            break;
            
        case $api_utils::POST:
            $ciclo->create($request);
            break;
            
        case $api_utils::PUT:
            $ciclo->update($request);
            break;
            
        case $api_utils::DELETE:
            $ciclo->delete($id);
            break;

        default:
    }
} else $ciclo->message = NO_TOKEN_MESSAGE;

$api_utils->response($ciclo->status, $ciclo->message, $ciclo->data, $authorization->permises);
echo json_encode($api_utils->response, JSON_PRETTY_PRINT);

?>