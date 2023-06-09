const modal = document.querySelector('.modal-overlay')

function openModal(){
  if (elementosPressionados.length == 2){
    document.getElementById('elementos_popup').innerHTML = 'Árvore de Busca do Elemento ' + elementosPressionados[0] + ' ao ' +elementosPressionados[1];
  }
  modal.classList.add('active')
  
}

function closeModal(){
  modal.classList.remove('active')
}

function closePopup() {
  document.querySelector('.popup-overlay').style.display = 'none';
  sessionStorage.setItem('alreadyVisited', true)
}