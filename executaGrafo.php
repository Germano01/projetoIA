<?php
$IAprojetoLocation = dirname(__FILE__)."/";
$IAprojetoLocation = str_replace('\\','/',$IAprojetoLocation);

if(isset($_POST['caminho'])) {
    $caminho = $_POST['caminho'];
    $shell = "python {$IAprojetoLocation}Python/teste.py \"{$caminho}\"";
    echo $shell;die;
    exec($shell);
}