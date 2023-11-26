<?php

require_once('./apiClasses/log.php');

$api_utils = new ApiUtils();
$api_utils->setHeaders($api_utils::GET);
$api_utils->displayErrors();

$authorization = new Authorization();
$authorization->comprobarToken();

$request = json_decode(file_get_contents("php://input"), true);

$log = new Log();

if ($authorization->token_valido) {
    $log->get();
	// $status = $auth->status;
} else $log->$message = NO_TOKEN_MESSAGE;

$api_utils->response($log->status, $log->message, $log->data);
echo json_encode($api_utils->response, JSON_PRETTY_PRINT);

?>