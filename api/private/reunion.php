<?php

require_once('./apiClasses/reunion.php');

$api_utils = new ApiUtils();
$api_utils->setHeaders($api_utils::ALL_HEADERS);
$api_utils->displayErrors();

$authorization = new Authorization();
$authorization->comprobarToken();

$request = json_decode(file_get_contents("php://input"), true);

$reunion = new Reunion();

if (isset($_GET["id"])) {
    $id = $_GET["id"];
} else {
    $id = 0;
}

if (isset($_GET["route"])) {
    $route = $_GET["route"];
}

if ($authorization->token_valido) {
    switch ($_SERVER['REQUEST_METHOD']) {
        case $api_utils::GET:
            if (isset($route)) {
                switch ($route) {
                    case $reunion::ROUTE_INFORME:
                        $reunion->getInforme($id);
                    break;
                    
                    default:
                }
            } else {
                $reunion->get($id);
            }
            break;

            
        case $api_utils::POST:
            $reunion->create($request);
            break;
            
        case $api_utils::PUT:
            $reunion->update($request);
            break;
            
        case $api_utils::DELETE:
            $reunion->delete($id);
            break;

        default:
    }
} else $reunion->message = NO_TOKEN_MESSAGE;

$api_utils->response($reunion->status, $reunion->message, $reunion->data, $authorization->permises);
echo json_encode($api_utils->response, JSON_PRETTY_PRINT);

?>