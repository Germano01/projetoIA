async function pegarJSON() {
    try {
      const response = await fetch('elementos.json');
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Ocorreu um erro ao carregar o arquivo JSON:', error);
    }
  }
  
async function testeTodasPossibilidadesElementos() {
    const elementosJson = await pegarJSON();
    var array = [];
    
    for (const key1 in elementosJson) {
        let elementoInicio = elementosJson[key1].simbolo;
        for (const key2 in elementosJson) {
            let elementoFim = elementosJson[key2].simbolo;
            let array = [elementoInicio, elementoFim];
            setTimeout(async function() {
              fazerBusca(array, true);
            }, 30);
            
        }        
    }
}