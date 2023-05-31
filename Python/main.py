import json
import bfs
import elementos as el
import nos

elementos = json.loads(el.json_elementos)
# print(json.dumps(elementos))

g = nos.gerar_grafo(elementos)

nos.figura_grafo(g)
# fazer todas as combinações de nos do grafo
for inicio in g.nodes():
    for final in g.nodes():
        hx = nos.heuristica(g, inicio, final)
        caminho = bfs.algoritmo(g, inicio, final)
        custo_total = bfs.custo_melhor_caminho(g, caminho)
        if hx > custo_total:
            print("ERROR")
            print(f"No inicio:{inicio}, No final: {final}\nH(x): {hx}, Custo: {custo_total}")
            exit()
