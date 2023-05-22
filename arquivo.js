let qntElementosPress = 0;
let elementosPressCSS = [];
let elementosJson;

async function pegarJSON() {
  try {
    const response = await fetch('elementos.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Ocorreu um erro ao carregar o arquivo JSON:', error);
  }
}

window.onload = async function() {
  elementosJson = await pegarJSON();
    console.log(elementosJson["H"].adjacentes)
  var celulas = document.getElementsByTagName("td");
  for (var i = 0; i < celulas.length; i++) {
    celulas[i].onclick = function() {
      if (qntElementosPress < 2) {
        elementosPressCSS.push(this);
        this.classList.add("elementos-pressionados");
        qntElementosPress++;
      } else {
        elementosPressCSS[0].classList.remove("elementos-pressionados");
        elementosPressCSS.shift();
        elementosPressCSS.push(this);
        this.classList.add("elementos-pressionados");
      }
      let nomeInicial = elementosPressCSS[0].querySelector(".nome").innerHTML;
      document.getElementById("elementoSelecionadoInicial").innerHTML = "Elemento Inicial: <br><br>" + nomeInicial;
      if (elementosPressCSS.length == 2) {
        let nomeFinal = elementosPressCSS[1].querySelector(".nome").innerHTML;
        document.getElementById("elementoSelecionadoFinal").innerHTML = "Elemento Final: <br><br>" + nomeFinal;
      }
    };
  }
};
