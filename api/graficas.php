
<?php
//Javi
require_once('./apiClasses/graficas.php');


$api_utils = new ApiUtils();
$api_utils->setHeaders($api_utils::ALL_HEADERS);
$api_utils->displayErrors();

$authorization = new Authorization();
$authorization->comprobarToken();

$request = json_decode(file_get_contents("php://input"), true);

$panelControl = new PanelControl();


if ($authorization->token_valido) {
    switch ($_SERVER['REQUEST_METHOD']) {
        case $api_utils::GET:
            
            $panelControl->getAll();    
            break;
        case $api_utils::POST:
            if (isset($_POST['excel'])) {
                $panelControl->excel($data);
            }else{
                $panelControl->post($request);
            }
            break;
        default:
    }
} else $panelControl->message = NO_TOKEN_MESSAGE;

$api_utils->response($panelControl->status, $panelControl->message, $panelControl->data, $authorization->permises);
echo json_encode($api_utils->response, JSON_PRETTY_PRINT);

?>