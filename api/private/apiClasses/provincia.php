<?php

require_once('interfaces/crud.php');
require_once('../conn.php');

class Provincia extends Conexion implements crud {
    public $status = false;
    public $message = NULL;
    public $data = NULL;
    const ROUTE = 'provincia';

    function __construct (){
        parent::__construct();
    }

    public function get() {
        $order = " ORDER BY provincia ";

        $sql = $this->conexion->prepare("SELECT * FROM `sgi_provincias`".$order);

        $exito = $sql->execute();

        if($exito) {
            $this->status = true;
            $this->data = $sql->fetchAll(PDO::FETCH_ASSOC);
        }

        $this->closeConnection();
    }

    public function create($data) {}
    public function update($data) {}
    public function delete($id) {}
}

?>