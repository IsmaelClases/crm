<?php

require_once('./apiClasses/tipo_entidad.php');

$api_utils = new ApiUtils();
$api_utils->setHeaders($api_utils::ALL_HEADERS);
$api_utils->displayErrors();

$authorization = new Authorization();
$authorization->comprobarToken();

$request = json_decode(file_get_contents("php://input"), true);

$tipo_entidad = new TipoEntidad();

if (isset($_GET["id"])) {
    $id = $_GET["id"];
}

if ($authorization->token_valido) {
    switch ($_SERVER['REQUEST_METHOD']) {
        case $api_utils::GET:
            $tipo_entidad->get();
            break;
            
        case $api_utils::POST:
            $tipo_entidad->create($request);
            break;
            
        case $api_utils::PUT:
            $tipo_entidad->update($request);
            break;
            
        case $api_utils::DELETE:
            $tipo_entidad->delete($id);
            break;

        default:
    }
} else $tipo_entidad->message = NO_TOKEN_MESSAGE;

$api_utils->response($tipo_entidad->status, $tipo_entidad->message, $tipo_entidad->data, $authorization->permises);
echo json_encode($api_utils->response, JSON_PRETTY_PRINT);

?>