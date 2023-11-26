<?php
require_once('./apiClasses/opcion.php');

$api_utils = new ApiUtils();
$api_utils->setHeaders($api_utils::ALL_HEADERS);
// $api_utils->displayErrors();

$authorization = new Authorization();
$authorization->comprobarToken();

$request = json_decode(file_get_contents("php://input"), true);

$opcion = new Opcion();

if (count($_GET) > 0) {
    $id = $_GET["id"];
}

if ($authorization->token_valido) {

    switch ($_SERVER['REQUEST_METHOD']) {
        case $api_utils::GET:
            $opcion->get();
            $authorization->getPermision($opcion::ROUTE);
            break;
        case $api_utils::POST:
            $authorization->havePermision($api_utils::POST, $opcion::ROUTE);
            if ($authorization->have_permision) {
                $opcion->create($request);
            } else $opcion->message = ADD_OPCION_NOT_PERMISION;
            break;
        case $api_utils::PUT:
            $authorization->havePermision($api_utils::PUT, $opcion::ROUTE);
            if ($authorization->have_permision) {
                $opcion->update($request);
            } else $opcion->message = EDIT_OPCION_NOT_PERMISION;
            break;
        case $api_utils::DELETE:
            $authorization->havePermision($api_utils::DELETE, $opcion::ROUTE);
            if ($authorization->have_permision) {
                $opcion->delete($id);
            } else $opcion->message = DELETE_OPCION_NOT_PERMISION;
            break;
        default:
    }
	// $status = $auth->status;
} else $opcion->$message = NO_TOKEN_MESSAGE;

$api_utils->response($opcion->status, $opcion->message, $opcion->data, $authorization->permises);
echo json_encode($api_utils->response, JSON_PRETTY_PRINT);

?>