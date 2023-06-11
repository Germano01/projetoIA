import json

import matplotlib.pyplot as plt
import networkx as nx

def gerar_grafo(elementos):
    g = nx.Graph()

    # Adiciona os nós
    for i in elementos.keys():
        simbolo = elementos[i]["simbolo"]
        m = elementos[i]["numeroAtomico"]
        gr = elementos[i]["grupo"]
        p = elementos[i]["periodo"]
        g.add_node(simbolo, numeroAtomico=m, grupo=gr, periodo=p)

    # Definir posições no grafo
    for i in g.nodes():
        grupo = elementos[i]["grupo"]
        #como são 7 periodos, subtrair por 8 inverte a tabela para ela ficar de cima para baixo
        periodo = 8 - elementos[i]["periodo"]
        posicao = (grupo, periodo)
        nx.set_node_attributes(g, {i: {"posicao": posicao}})


    # Adiciona as arestas
    for i in elementos.keys():
        simbolo = elementos[i]["simbolo"]
        adjacentes = elementos[i]['adjacentes']
        for adjacente in adjacentes:
            if not g.has_edge(simbolo, adjacente) and not g.has_edge(adjacente, simbolo):
                valor1 = elementos[simbolo]["numeroAtomico"]
                valor2 = elementos[adjacente]["numeroAtomico"]
                g.add_edge(simbolo, adjacente, custo=(valor1+valor2))

    # Printa custo de cada aresta
    # for u, v, data in g.edges(data=True):
    #     custo = data['custo']
    #     print(f"Custo da aresta ({u}, {v}): {custo}")

    return g

def heuristica(g, no_inicial, no_objetivo):
    # Calcular função heurística do nó inicial ao objetivo
    if all(node in g.nodes() for node in [no_inicial, no_objetivo]):
        numero_atomica_inicial = g.nodes[no_inicial]['numeroAtomico']
        grupo_inicial = g.nodes[no_inicial]['grupo']
        periodo_inicial = g.nodes[no_inicial]['periodo']

        numero_atomica_objetivo = g.nodes[no_objetivo]['numeroAtomico']
        grupo_objetivo = g.nodes[no_objetivo]['grupo']
        periodo_objetivo = g.nodes[no_objetivo]['periodo']

        h1 = abs((0.3*grupo_objetivo) * (0.7*periodo_objetivo)) - ((0.3*grupo_inicial) * (0.7*periodo_inicial))
        h2 = abs(numero_atomica_objetivo - numero_atomica_inicial)
        h3 = (h1 + h2) / 2
        # função de avaliação
        hx = h3
    else:
        if no_inicial not in g.nodes():
            print(f"Nó {no_inicial} não foi encontrado no grafo.")
        if no_objetivo not in g.nodes():
            print(f"Nó {no_objetivo} não foi encontrado no grafo.")

    return hx

def figura_grafo(g):
    pos = nx.get_node_attributes(g, "posicao")
    peso = nx.get_edge_attributes(g, "custo")

    plt.figure("Grafo tabela periodica", figsize=(40,50))
    nx.draw_networkx(g, pos, node_size=300,node_color='#D8BFD8', with_labels=True, font_size=10)
    nx.draw_networkx_edges(g, pos, edge_color='gray')
    nx.draw_networkx_edge_labels(g, pos, edge_labels=peso, font_size=8)
    plt.axis("off")
    plt.show()