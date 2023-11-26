<?php
require_once('./apiClasses/rol.php');

$api_utils = new ApiUtils();
$api_utils->setHeaders($api_utils::ALL_HEADERS);
$api_utils->displayErrors();

$authorization = new Authorization();
$authorization->comprobarToken();

$request = json_decode(file_get_contents("php://input"), true);

$rol = new Rol();

if (isset($_GET["id"])) {
    $id = $_GET["id"];
}

if ($authorization->token_valido) {

    switch ($_SERVER['REQUEST_METHOD']) {
        case $api_utils::GET:
            $rol->get();
            $authorization->getPermision($rol::ROUTE);
            break;
        case $api_utils::POST:
            $authorization->havePermision($api_utils::POST, $rol::ROUTE);
            if ($authorization->have_permision) {
                $rol->create($request);
            } else $rol->message = ADD_ROL_NOT_PERMISION;
            break;
        case $api_utils::PUT:
            $authorization->havePermision($api_utils::PUT, $rol::ROUTE);
            if ($authorization->have_permision) {
                $rol->update($request);
            } else $rol->message = EDIT_ROL_NOT_PERMISION;
            break;
        case $api_utils::DELETE:
            $authorization->havePermision($api_utils::DELETE, $rol::ROUTE);
            if ($authorization->have_permision) {
                $rol->delete($id);
            } else $rol->message = DELETE_ROL_NOT_PERMISION;
            break;
        default:
    }
	// $status = $auth->status;
} else $rol->$message = NO_TOKEN_MESSAGE;

$api_utils->response($rol->status, $rol->message, $rol->data, $authorization->permises);
echo json_encode($api_utils->response, JSON_PRETTY_PRINT);

?>