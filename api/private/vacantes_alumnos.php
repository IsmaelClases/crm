<?php

require_once('./apiClasses/vacantes_alumnos.php');

$api_utils = new ApiUtils();
$api_utils->setHeaders($api_utils::ALL_HEADERS);
$api_utils->displayErrors();

$authorization = new Authorization();
$authorization->comprobarToken();

$request = json_decode(file_get_contents("php://input"), true);

$vacantes = new VacantesAlumnos();

// Comprobacion de parametros
if (isset($_GET['opcion'])){
    $opcion = $_GET['opcion'];
} else {
    $opcion = 'vacante';
}

if (isset($_GET["id_vacante"])) {
    $id_vacante = $_GET["id_vacante"];
} else {
    $id_vacante = 0;
}

if (isset($_GET["id_unidad_centro"])) {
    $id_unidad_centro = $_GET["id_unidad_centro"];
} else {
    $alumnosSeleccionados = 0;
}

if (isset($_GET["alumnosSeleccionados"])) {
    $alumnosSeleccionados = $_GET["alumnosSeleccionados"];
} else {
    $alumnosSeleccionados = 0;
}

if ($authorization->token_valido) {
  switch ($_SERVER['REQUEST_METHOD']) {
    case $api_utils::GET:
      if($opcion == 'resumen') {
        $vacantes->getResumen();
      } else {
        $vacantes->get();
      }
      break;

        // De acuerdo al parametro 'opcion' llama al metodo 'create' o al metodo 'get'Alumnado' o 'insertarAlumnosSeleccionados0
    case $api_utils::POST:
      if($opcion == 'vacante') {
        $vacantes->create($request);
      } elseif ($opcion == 'buscar'){
        $vacantes->getAlumnado($request);
      } else {
        $vacantes->insertarAlumnosSeleccionados($request);
      }
      break;

    case $api_utils::PUT:
      $vacantes->update($request);
      break;

    case $api_utils::DELETE:
      $vacantes->delete($id_vacante);
      break;

      default:
  }
} else $vacantes->message = NO_TOKEN_MESSAGE;

$api_utils->response($vacantes->status, $vacantes->message, $vacantes->data, $authorization->permises);
echo json_encode($api_utils->response, JSON_PRETTY_PRINT);

?>
