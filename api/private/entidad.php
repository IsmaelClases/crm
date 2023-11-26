<?php

require_once('./apiClasses/entidad.php');

$api_utils = new ApiUtils();
$api_utils->setHeaders($api_utils::ALL_HEADERS);
$api_utils->displayErrors();

$authorization = new Authorization();
$authorization->comprobarToken();

$request = json_decode(file_get_contents("php://input"), true);

$entidad = new Entidad();

if (isset($_GET["id"])) {
    $id = $_GET["id"];
}

if (isset($_GET["route"])) {
    $route = $_GET["route"];
} else {
    $route = "";
}

if ($authorization->token_valido) {
    switch ($_SERVER['REQUEST_METHOD']) {
        case $api_utils::GET:
            if ($route == "obtener_contactos") {
                $entidad->getContactos($id);
                //mensajes???
            } else {
                $entidad->get();
            }
            break;
            
        case $api_utils::POST:
            $entidad->create($request);
            break;
            
        case $api_utils::PUT:
            $entidad->update($request);
            break;
            
        case $api_utils::DELETE:
            $entidad->delete($id);
            break;

        default:
    }
} else $entidad->message = NO_TOKEN_MESSAGE;

$api_utils->response($entidad->status, $entidad->message, $entidad->data, $authorization->permises);
echo json_encode($api_utils->response, JSON_PRETTY_PRINT);

?>