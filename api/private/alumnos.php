<?php
// Importa la clase Alumno que contiene las operaciones CRUD para la entidad "Alumno"
require_once('./apiClasses/alumnos.php');

// Configuración inicial de utilidades para la API
$api_utils = new ApiUtils();
$api_utils->setHeaders($api_utils::ALL_HEADERS);
$api_utils->displayErrors();

// Verificación del token de autorización
$authorization = new Authorization();
$authorization->comprobarToken();

// Obtención de datos de la solicitud en formato JSON
$request = json_decode(file_get_contents("php://input"), true);

// Creación de una instancia de la clase Alumno para realizar operaciones CRUD
$alumnos = new Alumnos();

// Verificación de parámetros para operaciones específicas
if (isset($_GET["id_alumno"])) {
    $id_alumno = $_GET["id_alumno"];
}

if (isset($_GET["centro_actual"])) {
    $centro_actual = $_GET["centro_actual"];
} else {
    $centro_actual = 0;
}

// Verificación de la validez del token de autorización
if ($authorization->token_valido) {
    // Según el método de solicitud HTTP, realiza la operación CRUD correspondiente
    switch ($_SERVER['REQUEST_METHOD']) {
        case $api_utils::GET:
            $alumnos->get($centro_actual);
            break;

        case $api_utils::POST:
            $alumnos->create($request);
            break;

        case $api_utils::PUT:
            $alumnos->update($request);
            break;

        case $api_utils::DELETE:
            $alumnos->delete($id_alumno);
            break;

        default:
    }
} else {
    // Mensaje si el token no es válido
    $alumnos->message = NO_TOKEN_MESSAGE;
}

// Construcción de la respuesta de la API
$api_utils->response($alumnos->status, $alumnos->message, $alumnos->data, $authorization->permises);
// Codificación de la respuesta en formato JSON y salida
echo json_encode($api_utils->response, JSON_PRETTY_PRINT);
?>
