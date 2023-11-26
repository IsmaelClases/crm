<?php
require_once('./apiClasses/usuario.php');



$api_utils = new ApiUtils();
$api_utils->setHeaders($api_utils::ALL_HEADERS);
$api_utils->displayErrors();

$authorization = new Authorization();
$authorization->comprobarToken();

$request = json_decode(file_get_contents("php://input"), true);

$usuario = new Usuario();


if (isset($_GET["id"])) {
    $id = $_GET["id"];
}

if (isset($_GET["route"])) {
    $route = $_GET["route"];
}


if ($authorization->token_valido) {

    switch ($_SERVER['REQUEST_METHOD']) {
        case $api_utils::GET:
            $usuario->get();
            $authorization->getPermision($usuario::ROUTE);
            break;
        case $api_utils::POST:
            $authorization->havePermision($api_utils::POST, $usuario::ROUTE);
            if ($authorization->have_permision) {
                $usuario->create($request);
            } else $usuario->message = ADD_USER_NOT_PERMISION;
            break;
        case $api_utils::PUT:
            if (isset($route)) {
                if($route == $usuario::ROUTE_PROFILE) {
                    $usuario->updateProfile($request, $authorization->token);
                }
            } else {
                $authorization->havePermision($api_utils::PUT, $usuario::ROUTE);
                if ($authorization->have_permision) {
                    $usuario->update($request);
                } else $usuario->message = EDIT_USER_NOT_PERMISION;
            }
            break;
        case $api_utils::DELETE:
            $authorization->havePermision($api_utils::DELETE, $usuario::ROUTE);
            if ($authorization->have_permision) {
                $usuario->delete($id);
            } else $usuario->message = DELETE_USER_NOT_PERMISION;
            break;
        default:
    }
} else $usuario->$message = NO_TOKEN_MESSAGE;

$api_utils->response($usuario->status, $usuario->message, $usuario->data, $authorization->permises);
echo json_encode($api_utils->response, JSON_PRETTY_PRINT);

?>