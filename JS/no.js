class No {
    constructor(elemento, avaliacao, custoReal, heuristica, pai) {
      this.elemento = elemento;
      this.avaliacao = avaliacao;
      this.custoReal = custoReal;
      this.heuristica = heuristica;
      this.pai = pai;
    }
  
    getCustoReal(custoPai) {
        this.custoReal =  elementosJson[this.elemento].numeroAtomico +
            elementosJson[this.pai].numeroAtomico
        if (custoPai != null) {
            this.custoReal = this.custoReal + custoPai
        }
    }

    calcularFA() {
        this.avaliacao = Number((this.custoReal + this.heuristica).toFixed(2));
    }
  
    calcularHeuristica() {
      let heuristica1 =
        Math.abs(
          (elementosJson[final].grupo * 0.3) *
            (elementosJson[final].periodo * 0.7) -
            (elementosJson[this.elemento].grupo * 0.3) *
              (elementosJson[this.elemento].periodo * 0.7)
        );
      let heuristica2 =
        Math.abs(
          elementosJson[final].numeroAtomico -
            elementosJson[this.elemento].numeroAtomico
        );
      let resultado = Number((heuristica1 + heuristica2).toFixed(2));
      this.heuristica = resultado;
    }
  
    getSolucaoOtima(caminho) {
      if (this.pai == null) {
        caminho = this.elemento + caminho;
        document.getElementById("solucao-otima").innerHTML= caminho;
        return caminho;
      } else {
        caminho = " -> " + this.elemento + caminho;
        let pai = this.pai;
        let elementoPai = null;
        closed.forEach((item) => {
          if (item.elemento == pai) {
            if (elementoPai != null) {
              if (item.avaliacao < elementoPai.avaliacao) {
                elementoPai = item;
              }
            } else {
              elementoPai = item;
            }
          }
        });
        let resultado = elementoPai.getSolucaoOtima(caminho);
        return resultado;
      }
    }

    getOutrasSolucoes(caminho){
      if (this.pai == null) {
        caminho = this.elemento + caminho;
        console.log("caminoh: " + caminho)
        if(caminho != solucaoOtima){
          document.getElementById("solucoes").innerHTML+= 
          `<p> ${caminho} </p>`;
        }
        return caminho;
      } else {
        caminho = " -> " + this.elemento + caminho;
        let pai = this.pai;
        closed.forEach((item) => {
          if (item.elemento == pai) {
             return item.getOutrasSolucoes(caminho);
          }
        });
      }
    }
  }
  