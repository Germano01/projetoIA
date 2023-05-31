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
      }
    };
  }
}

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
  let inicial = elementosPressCSS[0].querySelector(".siglacor").innerHTML;
  let final = elementosPressCSS[1].querySelector(".siglacor").innerHTML;
  closed.push({ elemento: inicial, avaliacao: 0, custoReal: 0, heuristica: 0, pai: null });
  executarAlgoritmo(inicial, final);
}

async function executarAlgoritmo(elemento, final) {
  elementosJson = await pegarJSON();
  if (elementosJson == null || !elementosJson) {
    console.log("ERRO ao pegar JSON");
    return;
  }
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
    console.log("FINALIZANDO ALGORITIMO")
    let caminhoFinal = await getCaminho(itemMenor, "");
    console.log("CAMINHO: " + caminhoFinal);
    const result = caminhoFinal.split(" -> ");
    pintarCaminho(result);
    return
  }
  console.log("Escolhendo elemento com menos f(a).... Escolhido: " + itemMenor.elemento);
  document.getElementById(itemMenor.elemento).parentNode.classList.add("borda-caminho");
  closed.push(itemMenor);
  opend.splice(indexMenor, 1);
  setTimeout(function() {
    executarAlgoritmo(itemMenor.elemento, final);
  }, 10);
}

async function abrirAdjacente(elemento, final) {
  return new Promise(resolve => {
    let adjacenteElemento = elementosJson[elemento].adjacentes;
    let custoPai;
    closed.forEach(function (item) {
      if (item.elemento == elemento) {
        custoPai = item.custoReal;
      }
    });
    console.log("Pegando elementos adjacentes de " + elemento);
    if (adjacenteElemento) {
      for (let i = 0; i < adjacenteElemento.length; i++) {
        let adjacente = elementosJson[elemento].adjacentes[i];
        console.log("Adjacente: " + adjacente)
        let hasAdjacente = false;
        closed.forEach(function (item) {
          if(item.elemento == adjacente){
            hasAdjacente = true;
          }
        })
        // VERIFICACAO - NA EXPANDIR NOVAMENTE MESMO ELEMENTO
        // opend.forEach(function (item) {
        //   if(item.elemento == adjacente){
        //     hasAdjacente = true;
        //   }
        // })
        if(!hasAdjacente){          
          if (adjacente && adjacente != null) {
            let fh = calcularHeuristica(adjacente, final);
            let custoReal = getCustoReal(adjacente, custoPai);
            let fa = fh + custoReal;
            const elementoAtual = { elemento: adjacente, avaliacao: fa, custoReal: custoReal, heuristica: fh, pai: elemento };
            opend.push(elementoAtual);
          }
        }
      }
    }
    resolve(); 
  });
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
    caminho = " -> " + elemento.elemento + caminho;
    console.log(elemento)
    let pai = elemento.pai;
    let elementoPai = null;
    closed.forEach(function (item) {
      if (item.elemento == pai) {
        if(elementoPai!= null){
          if(item.avaliacao<elementoPai.avaliacao){
            elementoPai = item;
          }
        }else{
          elementoPai = item;
        }
      }
    });
    let resultado = getCaminho(elementoPai, caminho); 
    return resultado; 
  }
}

function pintarCaminho(caminho){
  caminho.forEach(function (item) {
    document.getElementById(item).parentNode.classList.add("fundo-caminho");
  });
}

function calcularHeuristica(elemento, final){
  let heuristica1 = Math.abs(((elementosJson[final].grupo * 0.2) * (elementosJson[final].periodo * 0.8)) - ((elementosJson[elemento].grupo * 0.2) * (elementosJson[elemento].periodo * 0.8)));
  let heuristica2 = Math.abs(elementosJson[final].numeroAtomico - elementosJson[elemento].numeroAtomico)
  let resultado = heuristica1 + heuristica2;
  return resultado;
}
