window.onload = function() {
    var celulas = document.getElementsByTagName('td');
    for (var i = 0; i < celulas.length; i++) {
        celulas[i].onclick = function() {
            var nome = this.querySelector('.nome').innerHTML;
            document.getElementById('elementoSelecionado').innerHTML = "Elemento selecionado: <br><br>" + nome;
        };
    }
};