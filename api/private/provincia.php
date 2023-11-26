<?php

require_once('./apiClasses/provincia.php');

$api_utils = new ApiUtils();
$api_utils->setHeaders($api_utils::GET);
$api_utils->displayErrors();

$authorization = new Authorization();
$authorization->comprobarToken();

//$request = json_decode(file_get_contents("php://input"), true);

$provincia = new Provincia();

if ($authorization->token_valido) {
    switch ($_SERVER['REQUEST_METHOD']) {
        case $api_utils::GET:
            $provincia->get();
            break;
        
        default:
    }
} else { $provincia->message = NO_TOKEN_MESSAGE; }

$api_utils->response($provincia->status, $provincia->message, $provincia->data, $authorization->permises);
echo json_encode($api_utils->response, JSON_PRETTY_PRINT);

?>