<?php
require_once('./apiClasses/auth.php');

$api_utils = new ApiUtils();
$api_utils->setHeaders($api_utils::GET);
// $api_utils->displayErrors();

$auth = new Auth();

$request = json_decode(file_get_contents("php://input"), true);

$auth->recoverPassword($request);
$api_utils->response($auth->status, $auth->message, $auth->data);
echo json_encode($api_utils->response, JSON_PRETTY_PRINT);

?>