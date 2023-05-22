let qntElementosPress = 0;
let elementosPressCSS = [];

window.onload = function () {
  var celulas = document.getElementsByTagName("td");
  for (var i = 0; i < celulas.length; i++) {
    celulas[i].onclick = function () {
      if (qntElementosPress < 2) {
        elementosPressCSS.push(this)
        this.classList.add("elementos-pressionados");
        qntElementosPress++;
      }else{
        elementosPressCSS[0].classList.remove("elementos-pressionados");
        elementosPressCSS.shift();
        elementosPressCSS.push(this);
        this.classList.add("elementos-pressionados");
      }
      let nomeInicial = elementosPressCSS[0].querySelector(".nome").innerHTML;
      document.getElementById("elementoSelecionadoInicial").innerHTML = "Elemento Inicial: <br><br>" + nomeInicial;
      if(elementosPressCSS.length==2){
        let nomeFinal = elementosPressCSS[1].querySelector(".nome").innerHTML;
        document.getElementById("elementoSelecionadoFinal").innerHTML = "Elemento Final: <br><br>" + nomeFinal;
      }
    //   var sigla = this.querySelector(".siglacor").innerHTML;
    //   document.getElementById("elementoSelecionadoInicial").innerHTML += nomeInicial;
    };
  }
};
