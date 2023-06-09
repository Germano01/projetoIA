async function pegarJSON() {
    try {
        const response = await fetch('elementos.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Ocorreu um erro ao carregar o arquivo JSON:', error);
    }
}

async function eventos() {
    elementos = await pegarJSON();
    let listaFechada = JSON.parse(sessionStorage.getItem('closed'));
    let listaAberta = JSON.parse(sessionStorage.getItem('opened'));
    console.table(listaFechada);
    console.table(listaAberta);


    var nosCriadosEmArvore = [];

    function geraNo(x, pai) {
        return `
        <div class="no">
            <div class="nomeNo">
                ${x}
            </div>
            <div class="noAnterior">
                ${pai}
            </div>
            <div class="col">
                -
            </div>
        </div>
        `;
    }
    listaFechada.forEach(elemento => {
        var elementoJson = elementos[elemento];
        if (elementoJson) {
            //Se o elemento ainda não estiver na árvore (pode já ter sido adicionado quando passou pelos adjacentes), não adiciona novamente
            if (!(nosCriadosEmArvore.includes(elemento))) {
                //vou gerar com uma linha 
                document.getElementById('arvore').innerHTML += `
                <div class="row">
                ${geraNo(elemento, "-")}
                </div>
                `;
                nosCriadosEmArvore.push(elemento);
            }

            let adjacentes = elementoJson.adjacentes;

            var nosRow = ``;

            for (let i = 0; i < adjacentes.length; i++) {
                const adjacente = adjacentes[i];
                if (!nosCriadosEmArvore.includes(adjacente) && (aberta.includes(adjacente) || fechada.includes(adjacente))) {
                    nosCriadosEmArvore.push(adjacente);
                    nosRow += geraNo(adjacente, elemento);
                }
            }
            document.getElementById('arvore').innerHTML += `
            <div class="row">
                ${nosRow}
            </div>
            `;
        }
    });
}

window.addEventListener("load", function () {
    eventos();
});