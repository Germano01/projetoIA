//inicia a busca, limpando tabela e iniciando com o primeiro nó
function fazerBusca(){
    if(elementosPressionados.length != 2){
      alert("Selecione 2 elementos!");
      return;
    }
    if(opened.length != 0 || closed.length != 0){
      opened.forEach(function(item) {
        removeOrAddClass(item.elemento, ["no-aberto", "caminho-final", "visitado"], true);
      });
      closed.forEach(function(item) {
        removeOrAddClass(item.elemento, ["no-aberto", "caminho-final", "visitado"], true);
      });
    }
    limparListasNaTela();
    opened = [];
    closed = [];
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
    let itemMenor = opened[0];
    let indexMenor = 0;
    opened.forEach(function (item, index) {
      if (item.avaliacao < itemMenor.avaliacao) {
        itemMenor = item;
        indexMenor = index;
      }
    });
    if(itemMenor.elemento == final){
      let caminhoFinal = await itemMenor.getCaminho("");
      const result = caminhoFinal.split(" -> ");
      pintarCaminho(result);
      sessionStorage.setItem('closed', JSON.stringify(closed));
      sessionStorage.setItem('opened', JSON.stringify(opened));
      return
    }
    removeOrAddClass(itemMenor.elemento, ["no-aberto"], true);
    removeOrAddClass(itemMenor.elemento, ["visitado"], false);   
    closed.push(itemMenor);
    opened.splice(indexMenor, 1);
    mostrarListasNaTela()
    setTimeout(function() {
      executarAlgoritmo(itemMenor.elemento);
    }, 10);
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
                  if(item.avaliacao == elementoAtual.avaliacao)
                    hasAdjacente = true
                }
              })
              if(!hasAdjacente){
                opened.push(elementoAtual);
                removeOrAddClass(adjacente, ["no-aberto"], false);
              }
            }
          }
        }
      }
      resolve(); 
    });
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
      openedString += item.elemento;
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
      <p> ${openedString} </p>
    `;

    document.getElementById("closed").innerHTML+= `
    <p> ${closedString} </p>
    `;
  }