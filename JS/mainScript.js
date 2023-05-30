let qntElementosPress = 0;
let elementosPressCSS = [];
let elementosJson;
let opend = [];
let closed = [];
let inicial;
let final;

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

function fazerBusca(){
  if(opend.length != 0){
    opend.forEach(function(item) {
      document.getElementById(item.elemento).parentNode.classList.remove("borda-caminho");
      document.getElementById(item.elemento).parentNode.classList.remove("fundo-caminho");
    });
    closed.forEach(function(item) {
      document.getElementById(item.elemento).parentNode.classList.remove("borda-caminho");
      document.getElementById(item.elemento).parentNode.classList.remove("fundo-caminho");
    });
  }
  opend = [];
  closed = [];
  inicial = elementosPressCSS[0].querySelector(".siglacor").innerHTML;
  final = elementosPressCSS[1].querySelector(".siglacor").innerHTML;
  closed.push({ elemento: inicial, avaliacao: 0, custoReal: 0, heuristica: 0, pai: null });
  executarAlgoritmo(inicial, final);
}

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
      }
    };
  }
}

async function abrirAdjacente(elemento, final) {
  return new Promise(resolve => {
    let adjacenteElemento = elementosJson[elemento].adjacentes;
    let custoPai = null;
    if(closed.length != 0){
      closed.forEach(function (item) {
        if (item.elemento == elemento) {
          custoPai = item.custoReal;
        }
      });
    }
    //console.log("Pegando elementos adjacentes de " + elemento);
    if (adjacenteElemento) {
      for (let i = 0; i < adjacenteElemento.length; i++) {
        let adjacente = elementosJson[elemento].adjacentes[i];
        //console.log("Adjacente: " + adjacente)
        let hasAdjacente = false;
        closed.forEach(function (item) {
          if(item.elemento == adjacente){
            hasAdjacente = true;
          }
        })
        opend.forEach(function (item) {
          if(item.elemento == adjacente){
            hasAdjacente = true;
          }
        })
        if(!hasAdjacente){
          if (adjacente && adjacente != null) {
            let fh = calcularHeuristica(adjacente, final);
            let custoReal = getCustoReal(adjacente, custoPai);
            //console.log("Custo = " + custoReal);
            let fa = fh + custoReal;
            //console.log("f(a) = " + fa);
            const elementoAtual = { elemento: adjacente, avaliacao: fa, custoReal: custoReal, heuristica: fh, pai: elemento };
            //console.log("Adicionando " + adjacente + " na lista de abertos (opened) ...")
            opend.push(elementoAtual);
          }
        }
      }
    }
    resolve(); 
  });
}

async function executarAlgoritmo(elemento, final) {
  elementosJson = await pegarJSON();
  if (elementosJson == null || !elementosJson) {
    console.log("ERRO ao pegar JSON");
    return;
  }
  //console.log("Executando algoritimo de busca A*....");
  //console.log("CLOSED: " + closed)
  //console.log("Indo de: " + elemento + " até -> " + final);
  await abrirAdjacente(elemento, final); 
  let itemMenor = opend[0];
  let indexMenor = 0;
  opend.forEach(function (item, index) {
    if (item.avaliacao < itemMenor.avaliacao) {
      itemMenor = item;
      indexMenor = index;
    }
  });
  if(itemMenor.elemento == final){
    console.log("{ " + itemMenor.elemento + ", fa: " + itemMenor.avaliacao + ", custoReal: " + itemMenor.custoReal + ", heuristica: " + itemMenor.heuristica + ", pai: " + itemMenor.pai);
    console.log("FINALIZANDO ALGORITIMO")
    let caminhoFinal = await getCaminho(itemMenor, "");
    console.log("CAMINHO: " + caminhoFinal);
    return
  }
  console.log("Escolhendo elemento com menos f(a).... Escolhido: " + itemMenor.elemento);
  document.getElementById(itemMenor.elemento).parentNode.classList.add("borda-caminho");
  closed.push(itemMenor);
  opend.splice(indexMenor, 1);
  //printListas();
  console.log("___________________________________________________________________")
  // setTimeout(function() {
  //   executarAlgoritmo(itemMenor.elemento, final);
  // }, 1000);
  executarAlgoritmo(itemMenor.elemento, final);
}


function getCustoReal(elemento, custoPai){
  if(custoPai == null){
    return elementosJson[elemento].numeroAtomico;
  }else{
    return elementosJson[elemento].numeroAtomico + custoPai;
  }
}

function getCaminho(elemento, caminho) {
  if (elemento.pai == null) {
    caminho = elemento.elemento + caminho;
    return caminho;
  } else {
    document.getElementById(elemento.elemento).parentNode.classList.add("fundo-caminho");
    caminho = " -> " + elemento.elemento + caminho;
    let pai = elemento.pai;
    let resultado;
    closed.forEach(function (item) {
      if (item.elemento == pai) {
        resultado = getCaminho(item, caminho); 
      }
    });
    return resultado; 
  }
}

function printListas(){
  console.log("OPEND")
  opend.forEach(function (item) {
    console.log("{ " + item.elemento + ", fa: " + item.avaliacao + ", custoReal: " + item.custoReal + ", heuristica: " + item.heuristica + ", pai: " + item.pai);
  });
  console.log("CLOSED")
  closed.forEach(function (item) {
    console.log("{ " + item.elemento + ", avaliacao: " + item.avaliacao + ", custoReal: " + item.custoReal + ", heuristica: " + item.heuristica + ", pai: " + item.pai);
  });
}

function calcularHeuristica(elemento, final){
  //console.log("Calculando resultado da função heuristica de " + elemento + " -> " + final);
  let heuristica1 = Math.abs((elementosJson[final].grupo * elementosJson[final].periodo) - (elementosJson[elemento].grupo * elementosJson[elemento].periodo));
  let heuristica2 = Math.abs(elementosJson[final].numeroAtomico - elementosJson[elemento].numeroAtomico)
  let resultado = heuristica1 + heuristica2;
  //console.log("f(h) = " + resultado);
  return resultado;
}
