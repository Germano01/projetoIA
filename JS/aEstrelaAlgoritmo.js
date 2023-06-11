let elementosPressionados = [];
let elementosJson;
let opened = [];
let closed = []; 
let final;
let solucaoOtima;
let velocidadeBusca = 10;

//inicia a busca, limpando tabela e iniciando com o primeiro nó
function fazerBusca(array){
    console.log("entrei fazerBusca")
    //um array será enviado cada seja o arquivo "provaHeuristica.js" chamando
    let isProvarHeuristica = false;
    if(array != ''){
      elementosPressionados = array;
      isProvarHeuristica = true;
    }
    else{
      if(elementosPressionados.length != 2){
        console.log('Selecione 2 elementos! --' + elementosPressionados)
        //alert("Selecione 2 elementos!");
        return;
      }
    }
    if(!isProvarHeuristica){
      document.getElementById('caminhos-solucoes').style.display = 'block';
      limparDados();
    }else{
      opened = [];
      closed = [];
    }    
    // ------------------------
    const noFechado = new No(elementosPressionados[0], 0, 0, 0, null);
    closed.push(noFechado);
    final = elementosPressionados[1];
    executarAlgoritmo(elementosPressionados[0]);
}

//executa algoritimo A* - utilizando das listas opened e closed
async function executarAlgoritmo(elemento) {
    elementosJson = await pegarJSON();
    if (elementosJson == null || !elementosJson) {
      console.log("ERRO ao pegar JSON");
      return;
    }
    await abrirAdjacente(elemento); 
    // ------------------------
    mostrarListasNaTela()
    // ------------------------ fim
    let itemMenor = opened[0];
    // ------------------------
    removeOrAddClass(itemMenor.elemento, ["no-aberto"], true);
    removeOrAddClass(itemMenor.elemento, ["visitado"], false); 
    // ------------------------  
    closed.push(itemMenor);
    opened.splice(0, 1);
    if(itemMenor.elemento == final){
      solucaoOtima = await itemMenor.getSolucaoOtima([], 0);
      console.log(solucaoOtima)
      const result = solucaoOtima.split(" -> ");
      sessionStorage.setItem('caminho', result);
      // ------------------------
      pintarCaminho(result);
      itemMenor.getOutrasSolucoes("",0);
      opened.forEach(function (item) {
        if (item.elemento == final) {
          item.getOutrasSolucoes([],0);
        }
      });  
      mostrarListasNaTela()
      // ------------------------
      return
    }
    setTimeout(function() {
      executarAlgoritmo(itemMenor.elemento);
    }, velocidadeBusca);
  }

  //abre os nós adjacentes do nó passado no parametro
async function abrirAdjacente(elemento) {
    return new Promise(resolve => {
      let adjacenteElemento = elementosJson[elemento].adjacentes;
      let custoPai;
      closed.forEach(function (item) {
        if (item.elemento == elemento) {
          custoPai = item.custoReal;
        }
      });
      if (adjacenteElemento) {
        for (let i = 0; i < adjacenteElemento.length; i++) {
          let adjacente = elementosJson[elemento].adjacentes[i];
          let hasAdjacente = false;
          closed.forEach(function (item) {
            if(item.elemento == adjacente){
              hasAdjacente = true;
            }
          })
          if(!hasAdjacente){          
            if (adjacente && adjacente != null) {
              const elementoAtual = new No(adjacente, null, null, null, elemento);
              elementoAtual.calcularHeuristica();
              elementoAtual.getCustoReal(custoPai);
              elementoAtual.calcularFA();
              
              opened.forEach(function (item) {
                if(item.elemento == adjacente){
                  if((item.avaliacao == elementoAtual.avaliacao) || (item.pai == elementoAtual.pai))
                    hasAdjacente = true
                }
              })
              if(!hasAdjacente){
                opened.push(elementoAtual);
                ordenarOpened();
                // ------------------------
                removeOrAddClass(adjacente, ["no-aberto"], false);
                // ------------------------
              }
            }
          }
        }
      }
      resolve(); 
    });
  }

  function ordenarOpened() {
    const size = opened.length;
    
    for (let i = 1; i < size; i++) {
      const atual = opened[i];
      let j = i - 1;
  
      while (j >= 0 && opened[j].avaliacao > atual.avaliacao) {
        opened[j + 1] = opened[j];
        j--;
      }
  
      opened[j + 1] = atual;
    }
  
    return opened;
  }
  

  function limparListasNaTela(){
    document.getElementById("opened").innerHTML= `
      <p class="titulo">Abertos (opened): </p>
    `;

    document.getElementById("closed").innerHTML= `
      <p class="titulo">Fechados (closed): </p>
    `;
  }

  function mostrarListasNaTela(){
    let openedString = "{", closedString = "{";

    opened.forEach(function (item, index) {
      if(index != 0){
        openedString += ", ";
      }
      openedString += `${item.elemento} (${item.avaliacao}) `;
    })
    openedString += "}"

    closed.forEach(function (item, index) {
      if(index != 0){
        closedString += ", ";
      }
      closedString += item.elemento;
    })
    closedString += "}"

    document.getElementById("opened").innerHTML+= `
      <p class="item"> ${openedString} </p>
    `;

    document.getElementById("closed").innerHTML+= `
    <p class="item"> ${closedString} </p>
    `;
  }

  function limparDados(){
    if(opened.length != 0 || closed.length != 0){
      opened.forEach(function(item) {
        removeOrAddClass(item.elemento, ["no-aberto", "caminho-final", "visitado"], true);
      });
      closed.forEach(function(item) {
        removeOrAddClass(item.elemento, ["no-aberto", "caminho-final", "visitado"], true);
      });
    }
    limparListasNaTela();
    document.getElementById("solucoes").innerHTML = ``;
    document.getElementById("solucao-otima").innerHTML = ``;
    opened = [];
    closed = [];
  }