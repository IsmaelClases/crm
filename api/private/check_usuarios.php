<?php
    require_once('./apiClasses/auth.php');

    $api_utils = new ApiUtils();
    $api_utils->setHeaders($api_utils::GET);

    $authorization = new Authorization();
    $authorization->comprobarToken();

    $auth = new Auth();

    if ($authorization->token_valido) {
        $auth->checkUsuario($authorization->token, $_GET['ruta']);
    } else $auth->message = NO_TOKEN_MESSAGE;

    $api_utils->response($auth->status, $auth->message, NULL);
    echo json_encode($api_utils->response, JSON_PRETTY_PRINT);

?>