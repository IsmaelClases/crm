<?php
require_once('./apiClasses/unidad.php');

$api_utils = new ApiUtils();
$api_utils->setHeaders($api_utils::ALL_HEADERS);
$api_utils->displayErrors();

$authorization = new Authorization();
$authorization->comprobarToken();

$request = json_decode(file_get_contents("php://input"), true);

$unidad = new Unidad();

if (isset($_GET["id"])) {
    $id = $_GET["id"];
}

if (isset($_GET["entidad"])) {
    $entidad = $_GET["entidad"];
} else {
    $entidad = 0;
}

if ($authorization->token_valido) {
    switch ($_SERVER['REQUEST_METHOD']) {
        case $api_utils::GET:
            $unidad->get($entidad);
            break;
            
        case $api_utils::POST:
            $unidad->create($request);
            break;
            
        case $api_utils::PUT:
            $unidad->update($request);
            break;
            
        case $api_utils::DELETE:
            $unidad->delete($id);
            break;

        default:
    }
} else $unidad->message = NO_TOKEN_MESSAGE;

$api_utils->response($unidad->status, $unidad->message, $unidad->data, $authorization->permises);
echo json_encode($api_utils->response, JSON_PRETTY_PRINT);

?>