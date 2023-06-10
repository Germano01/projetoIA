async function carregaArvore() {
    //limpa arvore
    document.getElementById('arvore').innerHTML = '';
    
    let noFinal = elementosPressionados[1];
    let nosJaCriados = [];
    let listaFechada = JSON.stringify(closed);
    let listaAberta = JSON.stringify(opened);
    listaFechada = JSON.parse(listaFechada);
    listaAberta = JSON.parse(listaAberta);
    for (let i = 0; i < listaFechada.length; i++) {
        listaFechada[i].lista = 'fechada';
    }
    for (let i = 0; i < listaAberta.length; i++) {
        listaAberta[i].lista = 'aberta';
    }
    
    const mergedListas = listaFechada.concat(listaAberta);
    for (let i = 0; i < mergedListas.length; i++) {
        mergedListas[i].indice = i;
    }
    // console.table(mergedListas);

    const noInicio = {};
    noInicio[0] = listaFechada[0];
    addRow(noInicio);

    function addRow(arr) {
        var nosRow = ``;
        let adjacentes = {};
        let contagemAdjacente = 0;

        for (let i = 0; i < Object.keys(arr).length; i++) {
            nosRow += geraNo(arr[i].elemento, arr[i].pai, arr[i].avaliacao != 0 ? arr[i].avaliacao : '-');
            nosJaCriados.push(arr[i].elemento);
            
            verificaRemoverListas(arr[i]);

            for (let j = 0; j < mergedListas.length; j++) {
                if (mergedListas[j].pai === arr[i].elemento) {
                    adjacentes[contagemAdjacente++] = mergedListas[j];
                }
            }
        }

        // console.table(adjacentes);
        // console.log("\n");
        document.getElementById('arvore').innerHTML += `
        <div class="row">
            ${nosRow}
        </div>
        `;

        if (Object.keys(mergedListas).length === 0) {
            return 0;
        }
        else {
            // o for previne que gere nos depois da linha que já existe o no Objetivo
            for (let i = 0; i < nosJaCriados.length; i++) {
                if(nosJaCriados[i] === noFinal){
                    return 1;
                }
            } 
            addRow(adjacentes);
        }
    }

    function geraNo(x, pai, avaliacao) {
        return `
        <div class="no">
            <div class="nomeNo">
                ${x}
            </div>
            <div class="noAnterior">
                ${pai}
            </div>
            <div class="col">
                ${avaliacao}
            </div>
        </div>
        `;
    }

    async function verificaRemoverListas(obj) {
        for (let i = 0; i < mergedListas.length; i++) {
            if (obj.indice === mergedListas[i].indice) {
                await mergedListas.splice(i, 1);
            }
        }
    }
}