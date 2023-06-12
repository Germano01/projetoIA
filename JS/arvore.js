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
            let pai = arr[i].pai == null ? arr[i].pai : arr[i].pai.elemento
            nosRow += geraNo(arr[i].elemento, pai, arr[i].avaliacao != 0 ? arr[i].avaliacao : '-');
            nosJaCriados.push(arr[i].elemento);
            
            verificaRemoverMergedListas(arr[i]);

            let adjacenteJaCriado = false;
            for (let j = 0; j < mergedListas.length; j++) {
                if (mergedListas[j].pai.elemento === arr[i].elemento) {
                    for (let k = 0; k < Object.keys(adjacentes).length; k++) {
                        if(adjacentes[k].indice === mergedListas[j].indice){
                            adjacenteJaCriado = true;
                        }
                    }
                    if (!adjacenteJaCriado) {
                        adjacentes[contagemAdjacente++] = mergedListas[j];
                    }                                       
                }
            }
        }

        console.table(adjacentes);
        console.log("\n");
        document.getElementById('arvore').innerHTML += `
        <div class="row">
            ${nosRow}
        </div>
        `;

        // se o json mergedListas estiver vazio, significa que já rodou todos da lista aberta e fechada
        if (Object.keys(mergedListas).length === 0) {
            return 0;
        }
        else {
            // vai previnir que gere nos depois da linha que já existe o no Objetivo
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

    async function verificaRemoverMergedListas(obj) {
        for (let i = 0; i < mergedListas.length; i++) {
            if (obj.indice === mergedListas[i].indice) {
                await mergedListas.splice(i, 1);
            }
        }
    }
}