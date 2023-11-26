<?php
require_once('./apiClasses/contacto.php');

$api_utils = new ApiUtils();
$api_utils->setHeaders($api_utils::ALL_HEADERS);
$api_utils->displayErrors();

$authorization = new Authorization();
$authorization->comprobarToken();

$request = json_decode(file_get_contents("php://input"), true);

$contacto = new Contacto();

if (isset($_GET["id"])) {
    $id = $_GET["id"];
}

if (isset($_GET["entidad"])) {
    $entidad = $_GET["entidad"];
} else {
    $entidad = 0;
}

if (isset($_GET["reunion"])) {
    $reunion = $_GET["reunion"];
} else {
    $reunion = 0;
}

if ($authorization->token_valido) {
    switch ($_SERVER['REQUEST_METHOD']) {
        case $api_utils::GET:
            $contacto->get($entidad, $reunion);
            $authorization->getPermision($contacto::ROUTE);
            break;
            
        case $api_utils::POST:
            $contacto->create($request);
            break;
            
        case $api_utils::PUT:
            $contacto->update($request);
            break;
            
        case $api_utils::DELETE:
            $contacto->delete($id);
            break;

        default:
    }
} else $contacto->message = NO_TOKEN_MESSAGE;

$api_utils->response($contacto->status, $contacto->message, $contacto->data, $authorization->permises);
echo json_encode($api_utils->response, JSON_PRETTY_PRINT);

?>