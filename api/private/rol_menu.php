<?php
require_once('./apiClasses/rol_menu.php');

$api_utils = new ApiUtils();
$api_utils->setHeaders($api_utils::ALL_HEADERS);
$api_utils->displayErrors();

$authorization = new Authorization();
$authorization->comprobarToken();

$request = json_decode(file_get_contents("php://input"), true);

$rol_menu = new RolMenu();

if (count($_GET) > 0) {
    $id = $_GET["id"];
}

if ($authorization->token_valido) {

    switch ($_SERVER['REQUEST_METHOD']) {
        case $api_utils::GET:
            $rol_menu->get();
            $authorization->getPermision($rol_menu::ROUTE);
            break;
        case $api_utils::POST:
            $authorization->havePermision($api_utils::POST, $rol_menu::ROUTE);
            if ($authorization->have_permision) {
                $rol_menu->create($request);
            } else $rol_menu->message = ADD_ROL_MENU_NOT_PERMISION;
            break;
        case $api_utils::PUT:
            $authorization->havePermision($api_utils::PUT, $rol_menu::ROUTE);
            if ($authorization->have_permision) {
                $rol_menu->update($request);
            } else $rol_menu->message = EDIT_ROL_MENU_NOT_PERMISION;
            break;
        case $api_utils::DELETE:
            $authorization->havePermision($api_utils::DELETE, $rol_menu::ROUTE);
            if ($authorization->have_permision) {
                $rol_menu->delete($id);
            } else $rol_menu->message = DELETE_ROL_MENU_NOT_PERMISION;
            break;
        default:
    }
	// $status = $auth->status;
} else $rol_menu->$message = NO_TOKEN_MESSAGE;

$api_utils->response($rol_menu->status, $rol_menu->message, $rol_menu->data, $authorization->permises);
echo json_encode($api_utils->response, JSON_PRETTY_PRINT);

?>