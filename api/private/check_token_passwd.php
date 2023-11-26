<?php
    require_once('./apiClasses/auth.php');

    $api_utils = new ApiUtils();
    $api_utils->setHeaders($api_utils::POST);
    $api_utils->displayErrors();


    $request = json_decode(file_get_contents("php://input"), true);
    $request["token"];

    $auth = new Auth();

    $auth->checkTokenPassword($request["token"]);

    $api_utils->response($auth->status, $auth->message, NULL);
    echo json_encode($api_utils->response, JSON_PRETTY_PRINT);

?>