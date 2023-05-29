let qntElementosPress = 0;
let elementosPressCSS = [];
let elementosJson;
let opend = [];
let closed = [];

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
    selecionarElementosFinalEInicial();
};

function selecionarElementosFinalEInicial(){
  var celulas = document.getElementsByTagName("td");
  for (var i = 0; i < celulas.length; i++) {
    celulas[i].onclick = function() {
      if (this.classList.contains("excessao") || this.classList.contains("inclicaveis")) {
        return; 
      }
      if (qntElementosPress < 2) {
        elementosPressCSS.push(this);
        this.classList.add("elementos-pressionados");
        qntElementosPress++;
      } else {
        if(elementosPressCSS[0] != elementosPressCSS[1]){
          elementosPressCSS[0].classList.remove("elementos-pressionados");
        }
        elementosPressCSS.shift();
        elementosPressCSS.push(this);
        this.classList.add("elementos-pressionados");
      }
      let nomeInicial = elementosPressCSS[0].querySelector(".nome").innerHTML;
      document.getElementById("elementoSelecionadoInicial").innerHTML = "Elemento Inicial: <br><br>" + nomeInicial;
      if (elementosPressCSS.length == 2) {
        let nomeFinal = elementosPressCSS[1].querySelector(".nome").innerHTML;
        document.getElementById("elementoSelecionadoFinal").innerHTML = "Elemento Final: <br><br>" + nomeFinal;
        opend = [];
        executarAlgoritimo(elementosPressCSS[0].querySelector(".siglacor").innerHTML, elementosPressCSS[1].querySelector(".siglacor").innerHTML);
      }
    };
  }
}

async function executarAlgoritimo(inicial, final){
  elementosJson = await pegarJSON();
  console.log(inicial + ", " + final) 
  if(elementosJson == null || !elementosJson){
    console.log("ERRO ao pegar JSON");
    return
  }
  let adjacentesInicial = elementosJson[inicial].adjacentes;
  if(adjacentesInicial){
    for(let i = 0; i < adjacentesInicial.length; i++){
      let adjacente = elementosJson[inicial].adjacentes[i];
      if(adjacente && adjacente!=null){
        let fh = calcularHeuristica(adjacente, final);
        let fa = fh + elementosJson[adjacente].numeroAtomico;
        const elementoAtual = {elemento: adjacente, avaliacao: fa};
        opend.push(elementoAtual);
      }
    }

    let itemMenor = opend[0];
    opend.forEach(function(item, index) {
      if(item.avaliacao < itemMenor.avaliacao){
        itemMenor = item;
      }
    });

    document.getElementById(itemMenor.elemento).parentNode.classList.add("borda-caminho");
  }
}

function calcularHeuristica(elemento, final){
  let heuristica1 = Math.abs((elementosJson[final].grupo * elementosJson[final].periodo) - (elementosJson[elemento].grupo * elementosJson[elemento].periodo));
  let heuristica2 = Math.abs(elementosJson[final].numeroAtomico - elementosJson[elemento].numeroAtomico)
  let resultado = heuristica1 + heuristica2;
  return resultado;
}
