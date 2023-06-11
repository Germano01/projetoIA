

//pega dados do JSON
async function pegarJSON() {
  try {
    const response = await fetch('elementos.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Ocorreu um erro ao carregar o arquivo JSON:', error);
  }
}

//chama funcao selecionarElementosFinalEInicial ao carregar página
window.onload = async function() {
    let visited = sessionStorage.getItem('alreadyVisited')
    if(visited){
      document.querySelector('.popup-overlay').style.display = 'none';
    }else{
      document.querySelector('.popup-overlay').style.display = 'flex';
    }
    var botaov10 = document.querySelectorAll('.v10');
    botaov10[0].classList.add('velocidade-selecionada');

    selecionarElementosFinalEInicial();
};

//Seleciona elementos da tabela ao clicar, ja salvando os valores selecionados em uma variavel
function selecionarElementosFinalEInicial(){
  var celulas = document.getElementsByTagName("td");
  for (var i = 0; i < celulas.length; i++) {
    celulas[i].onclick = function() {
      if (this.classList.contains("excessao") || this.classList.contains("inclicaveis")) {
        return; 
      }
      if (elementosPressionados.length < 2) {
        elementosPressionados.push(this.querySelector(".siglacor").innerHTML);
        this.classList.add("elementos-pressionados");
      } else {
        if(elementosPressionados[0] != elementosPressionados[1]){
          removeOrAddClass(elementosPressionados[0], ["elementos-pressionados"], true);
        }
        elementosPressionados.shift();
        elementosPressionados.push(this.querySelector(".siglacor").innerHTML);
        removeOrAddClass(elementosPressionados[1], ["elementos-pressionados"], false);
      }
      let elementoInicial = document.getElementById(elementosPressionados[0]).parentNode.querySelector(".nome").innerHTML;
      document.getElementById("elementoSelecionadoInicial").innerHTML = "Elemento Inicial: <br><br>" + elementoInicial;
      if(elementosPressionados.length == 2){      
        let elementoFinal = document.getElementById(elementosPressionados[1]).parentNode.querySelector(".nome").innerHTML;
        document.getElementById("elementoSelecionadoFinal").innerHTML = "Elemento Final: <br><br>" + elementoFinal;
      }
    };
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var botoesVelocidade = document.querySelectorAll('.velocidade');
  
  botoesVelocidade.forEach(function(botao) {
    botao.addEventListener('click', function() {
      botoesVelocidade.forEach(function(b) {
        b.classList.remove('velocidade-selecionada');
      });

      velocidadeBusca = parseInt(botao.getAttribute('data-valor'));
      
      botao.classList.add('velocidade-selecionada');
    });
  });
});

//remove ou adiciona classes css no elemento passado
function removeOrAddClass(elemento, classes, isRemove){
    classes.forEach(function(classe) {
        if(isRemove){
            document.getElementById(elemento).parentNode.classList.remove(classe);
        }else{
            document.getElementById(elemento).parentNode.classList.add(classe);
        }
    });
}

//pinta o caminho final
function pintarCaminho(caminho) {
    caminho.forEach(function (item) {
      removeOrAddClass(item, ["caminho-final"], false);
    });
  }
  