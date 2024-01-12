<?php
// Importa la clase UnidadCentro que contiene las operaciones CRUD para la entidad "UnidadCentro"
require_once('./apiClasses/unidades_centro.php');

// Configuración inicial de utilidades para la API
$api_utils = new ApiUtils();
$api_utils->setHeaders($api_utils::ALL_HEADERS);
$api_utils->displayErrors();

// Verificación del token de autorización
$authorization = new Authorization();
$authorization->comprobarToken();

// Obtención de datos de la solicitud en formato JSON
$request = json_decode(file_get_contents("php://input"), true);

// Creación de una instancia de la clase UnidadCentro para realizar operaciones CRUD
$unidadesCentro = new UnidadesCentro();

// Verificación de parámetros para operaciones específicas
if (isset($_GET["id_unidad_centro"])) {
    $id_unidad_centro = $_GET["id_unidad_centro"];
}

if (isset($_GET["entidad"])) {
    $entidad = $_GET["entidad"];
} else {
    $entidad = 0;
}

// Verificación de la validez del token de autorización
if ($authorization->token_valido) {
    // Según el método de solicitud HTTP, realiza la operación CRUD correspondiente
    switch ($_SERVER['REQUEST_METHOD']) {
        case $api_utils::GET:
            $unidadesCentro->get($entidad);
            break;

        case $api_utils::POST:
            $unidadesCentro->create($request);
            break;

        case $api_utils::PUT:
            $unidadesCentro->update($request);
            break;

        case $api_utils::DELETE:
            $unidadesCentro->delete($id_unidad_centro);
            break;

        default:
    }
} else {
    // Mensaje si el token no es válido
    $unidadesCentro->message = NO_TOKEN_MESSAGE;
}

// Construcción de la respuesta de la API
$api_utils->response($unidadesCentro->status, $unidadesCentro->message, $unidadesCentro->data, $authorization->permises);
// Codificación de la respuesta en formato JSON y salida
echo json_encode($api_utils->response, JSON_PRETTY_PRINT);
?>
