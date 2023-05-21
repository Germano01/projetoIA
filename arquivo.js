function exibirElemento(elementId) {
    var elemento = document.getElementById(elementId).querySelector('.sigla').innerHTML;
    document.getElementById('elementoSelecionado').innerHTML = "Elemento selecionado: " + elemento;
}