<?php
$IAprojetoLocation = dirname(__FILE__)."/";
$IAprojetoLocation = str_replace('\\','/',$IAprojetoLocation);

if(isset($_POST['caminho'])) {
    $caminho = $_POST['caminho'];
    $shell = "python {$IAprojetoLocation}Python/geraGrafo.py \"{$caminho}\"";
    echo $shell;
    exec($shell);die;
}