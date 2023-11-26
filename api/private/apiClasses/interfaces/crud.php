<?php

interface crud
{
    public function get();
    public function create($data);
    public function update($data);
    public function delete($id);
}

?>