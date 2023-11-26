<?php
require_once('./apiClasses/grupo.php');

$api_utils = new ApiUtils();
$api_utils->setHeaders($api_utils::ALL_HEADERS);
$api_utils->displayErrors();

$authorization = new Authorization();
$authorization->comprobarToken();

$request = json_decode(file_get_contents("php://input"), true);

$grupo = new Grupo();

if (count($_GET) > 0) {
    $id = $_GET["id"];
}

if ($authorization->token_valido) {

    switch ($_SERVER['REQUEST_METHOD']) {
        case $api_utils::GET:
            $grupo->get();
            $authorization->getPermision($grupo::ROUTE);
            break;
        case $api_utils::POST:
            $authorization->havePermision($api_utils::POST, $grupo::ROUTE);
            if ($authorization->have_permision) {
                $grupo->create($request);
            } else $usuario->message = ADD_GRUPO_NOT_PERMISION;
            break;
        case $api_utils::PUT:
            $authorization->havePermision($api_utils::PUT, $grupo::ROUTE);
            if ($authorization->have_permision) {
                $grupo->update($request);
            } else $usuario->message = EDIT_GRUPO_NOT_PERMISION;
            break;
        case $api_utils::DELETE:
            $authorization->havePermision($api_utils::DELETE, $grupo::ROUTE);
            if ($authorization->have_permision) {
                $grupo->delete($id);
            } else $usuario->message = DELETE_GRUPO_NOT_PERMISION;
            break;
        default:
    }
	// $status = $auth->status;
} else $grupo->$message = NO_TOKEN_MESSAGE;

$api_utils->response($grupo->status, $grupo->message, $grupo->data, $authorization->permises);
echo json_encode($api_utils->response, JSON_PRETTY_PRINT);

?>