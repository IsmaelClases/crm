<?php

require_once('./apiClasses/unidad_dual.php');

$api_utils = new ApiUtils();
$api_utils->setHeaders($api_utils::ALL_HEADERS);
$api_utils->displayErrors();

$authorization = new Authorization();
$authorization->comprobarToken();

$request = json_decode(file_get_contents("php://input"), true);

$unidad_dual = new UnidadDual();

if (isset($_GET["id"])) {
    $id = $_GET["id"];
}

if ($authorization->token_valido) {
    switch ($_SERVER['REQUEST_METHOD']) {
        case $api_utils::GET:
            $unidad_dual->get();
            break;
            
        case $api_utils::POST:
            $unidad_dual->create($request);
            break;
            
        case $api_utils::PUT:
            $unidad_dual->update($request);
            break;
            
        case $api_utils::DELETE:
            $unidad_dual->delete($id);
            break;

        default:
    }
} else $unidad_dual->message = NO_TOKEN_MESSAGE;

$api_utils->response($unidad_dual->status, $unidad_dual->message, $unidad_dual->data, $authorization->permises);
echo json_encode($api_utils->response, JSON_PRETTY_PRINT);

?>