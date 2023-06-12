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
            elementosJson[this.pai.elemento].numeroAtomico
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

    calcularHeuristicaNaoAdmissivel() {
      let heuristica1 = Math.abs(elementosJson[final].massaAtomica - elementosJson[this.elemento].massaAtomica)
      let resultado = heuristica1;
      this.heuristica = resultado;
    }
  
    getSolucaoOtima(caminho, custo) {
      if (this.pai == null) {
        caminho = this.elemento + caminho;
        document.getElementById("solucao-otima").innerHTML= `${caminho} - (Custo: ${custo})`;
        return caminho;
      } else {
        custo += elementosJson[this.elemento].numeroAtomico + elementosJson[this.pai.elemento].numeroAtomico;
        caminho = " -> " + this.elemento + caminho;
        let elementoPai = this.pai;
        let resultado = elementoPai.getSolucaoOtima(caminho, custo);
        return resultado;
      }
    }

    getOutrasSolucoes(caminho, custo){
      if (this.pai == null) {
        caminho = this.elemento + caminho;
        if(caminho != solucaoOtima){
          document.getElementById("solucoes").innerHTML+= 
          `<p> ${caminho} - (Custo: ${custo})</p>`;
        }
        return caminho;
      } else {
        custo += elementosJson[this.elemento].numeroAtomico + elementosJson[this.pai.elemento].numeroAtomico;
        caminho = " -> " + this.elemento + caminho;
        let elementoPai = this.pai;
        return elementoPai.getOutrasSolucoes(caminho, custo);
      }
    }
  }
  