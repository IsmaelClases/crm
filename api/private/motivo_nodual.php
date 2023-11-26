<?php

require_once('./apiClasses/motivo_nodual.php');

$api_utils = new ApiUtils();
$api_utils->setHeaders($api_utils::ALL_HEADERS);
$api_utils->displayErrors();

$authorization = new Authorization();
$authorization->comprobarToken();

$request = json_decode(file_get_contents("php://input"), true);

$motivo_nodual = new MotivoNodual();

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
            $motivo_nodual->get($entidad);
            break;
            
        case $api_utils::POST:
            $motivo_nodual->create($request);
            break;
            
        case $api_utils::PUT:
            $motivo_nodual->update($request);
            break;
            
        case $api_utils::DELETE:
            $motivo_nodual->delete($id);
            break;

        default:
    }
} else $motivo_nodual->message = NO_TOKEN_MESSAGE;

$api_utils->response($motivo_nodual->status, $motivo_nodual->message, $motivo_nodual->data, $authorization->permises);
echo json_encode($api_utils->response, JSON_PRETTY_PRINT);

?>