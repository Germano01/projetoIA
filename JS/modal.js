const modal = document.querySelector('.modal-overlay')

function openModal(){
  if(opened.length == 0 && closed.length == 0){
    alert("Faça uma busca primeiro, para então ver a árvore!");
    return;
  }
  if (elementosPressionados.length == 2){
    document.getElementById('elementos_popup').innerHTML = 'Árvore de Busca do Elemento ' + elementosPressionados[0] + ' ao ' +elementosPressionados[1];
  }
  modal.classList.add('active')
  eventos()
}

function closeModal(){
  modal.classList.remove('active')
}

function closePopup() {
  document.querySelector('.popup-overlay').style.display = 'none';
  sessionStorage.setItem('alreadyVisited', true)
}