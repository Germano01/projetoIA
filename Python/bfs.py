from collections import deque

# Função para realizar a busca em largura (BFS)
def algoritmo(grafo, no_inicial, no_objetivo):
    fila = deque()
    visitados = set()

    # Inicializa a fila com o nó inicial
    fila.append((no_inicial, []))

    while fila:
        # fila.popleft() remove primeiro elemento inserido e retorna ele
        no_atual, caminho_atual = fila.popleft()

        if no_atual == no_objetivo:
            # Nó objetivo encontrado, retorna o caminho percorrido
            return caminho_atual + [no_atual]

        if no_atual not in visitados:
            visitados.add(no_atual)

            # Obtém os vizinhos do nó atual
            vizinhos = grafo.neighbors(no_atual)

            for vizinho in vizinhos:
                # exemplo: g["H"]["Li"]['custo']
                custo = grafo[no_atual][vizinho]['custo']
                novo_caminho = caminho_atual + [no_atual]

                # Adiciona o vizinho à fila com o novo caminho e atualiza o custo
                fila.append((vizinho, novo_caminho))

    # Nó objetivo não foi encontrado, retorna None
    return None


def custo_melhor_caminho(grafo, elementos):
    custo_total = 0

    # Verifica pares de elementos adjacentes
    for i in range(len(elementos) - 1):
        no_atual = elementos[i]
        prox_no = elementos[i + 1]
        custo = grafo[no_atual][prox_no]['custo']
        custo_total += custo

    return custo_total