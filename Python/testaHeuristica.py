import sys
import json
import matplotlib.pyplot as plt
import networkx as nx

# PARA TESTAR COLOQUE NO CMD: python caminho_deste_arquivo_na_maquina True
# caso deseja se testar a heurística não admissível troque True por False

argFromIAprojeto = sys.argv[1]
argFromIAprojeto = argFromIAprojeto.lower()

if argFromIAprojeto == "true":
    argFromIAprojeto = True
elif argFromIAprojeto == "false":
    argFromIAprojeto = False
else:
    print("Argumento inválido. Deve ser 'true' ou 'false'")
    sys.exit(1)

json_elementos = '''
{
    "H": {
      "numeroAtomico": 1,
      "simbolo": "H",
      "nome": "Hidrogênio",
      "massaAtomica": 1.008,
      "adjacentes" : ["Li"],
      "grupo": 1,
      "periodo": 1  
    },
    "He": {
      "numeroAtomico": 2,
      "simbolo": "He",
      "nome": "Hélio",
      "massaAtomica": 4.0026,
      "adjacentes" : ["Ne"],
      "grupo": 18,
      "periodo": 1 
    },
    "Li": {
      "numeroAtomico": 3,
      "simbolo": "Li",
      "nome": "Lítio",
      "massaAtomica": 6.94,
      "adjacentes" : ["H", "Be", "Na"],
      "grupo": 1,
      "periodo": 2  
    },
    "Be": {
      "numeroAtomico": 4,
      "simbolo": "Be",
      "nome": "Berílio",
      "massaAtomica": 9.0122,
      "adjacentes" : ["Li", "Mg"],
      "grupo": 2,
      "periodo":  2
    },
    "B": {
      "numeroAtomico": 5,
      "simbolo": "B",
      "nome": "Boro",
      "massaAtomica": 10.81,
      "adjacentes" : ["Al", "C"],
      "grupo": 13,
      "periodo": 2
    },
    "C": {
      "numeroAtomico": 6,
      "simbolo": "C",
      "nome": "Carbono",
      "massaAtomica": 12.01,
      "adjacentes" : ["B", "Si", "N"],
      "grupo": 14,
      "periodo": 2
    },
    "N": {
      "numeroAtomico": 7,
      "simbolo": "N",
      "nome": "Nitrogênio",
      "massaAtomica": 14.01,
      "adjacentes" : ["C", "P", "O"],
      "grupo": 15,
      "periodo": 2
    },
    "O": {
      "numeroAtomico": 8,
      "simbolo": "O",
      "nome": "Oxigênio",
      "massaAtomica": 16.00,
      "adjacentes" : ["N", "S", "F"],
      "grupo": 16,
      "periodo": 2
    },
    "F": {
      "numeroAtomico": 9,
      "simbolo": "F",
      "nome": "Flúor",
      "massaAtomica": 19.00,
      "adjacentes" : ["O", "Cl", "Ne"],
      "grupo": 17,
      "periodo": 2
    },
    "Ne": {
      "numeroAtomico": 10,
      "simbolo": "Ne",
      "nome": "Neônio",
      "massaAtomica": 20.18,
      "adjacentes" : ["He", "F", "Ar"],
      "grupo": 18,
      "periodo": 2
    },
    "Na": {
      "numeroAtomico": 11,
      "simbolo": "Na",
      "nome": "Sódio",
      "massaAtomica": 22.99,
      "adjacentes" : ["Li", "Mg", "K"],
      "grupo": 1,
      "periodo": 3
    },
    "Mg": {
      "numeroAtomico": 12,
      "simbolo": "Mg",
      "nome": "Magnésio",
      "massaAtomica": 24.31,
      "adjacentes" : ["Be", "Na", "Ca"],
      "grupo": 2,
      "periodo": 3
    },
    "Al": {
      "numeroAtomico": 13,
      "simbolo": "Al",
      "nome": "Alumínio",
      "massaAtomica": 26.98,
      "adjacentes" : ["B","Si","Ga"],
      "grupo": 13,
      "periodo": 3 
    },
    "Si": {
      "numeroAtomico": 14,
      "simbolo": "Si",
      "nome": "Silício",
      "massaAtomica": 28.09,
      "adjacentes" : ["C", "Al", "Ge", "P"],
      "grupo": 14,
      "periodo": 3
    },
    "P": {
      "numeroAtomico": 15,
      "simbolo": "P",
      "nome": "Fósforo",
      "massaAtomica": 30.97,
      "adjacentes" : ["N", "Si", "As", "S"],
      "grupo": 15,
      "periodo": 3
    },
    "S": {
      "numeroAtomico": 16,
      "simbolo": "S",
      "nome": "Enxofre",
      "massaAtomica": 32.07,
      "adjacentes" : ["O", "P", "Se", "Cl"],
      "grupo": 16,
      "periodo": 3
    },
    "Cl": {
      "numeroAtomico": 17,
      "simbolo": "Cl",
      "nome": "Cloro",
      "massaAtomica": 35.45,
      "adjacentes" : ["F", "S", "Br", "Ar"],
      "grupo": 17,
      "periodo": 3
    },
    "Ar": {
      "numeroAtomico": 18,
      "simbolo": "Ar",
      "nome": "Argônio",
      "massaAtomica": 39.95,
      "adjacentes" : ["Ne", "Cl", "Kr"],
      "grupo": 18,
      "periodo": 3
    },
    "K": {
      "numeroAtomico": 19,
      "simbolo": "K",
      "nome": "Potássio",
      "massaAtomica": 39.10,
      "adjacentes" : ["Na", "Ca", "Rb"],
      "grupo": 1,
      "periodo": 4
    },
    "Ca": {
      "numeroAtomico": 20,
      "simbolo": "Ca",
      "nome": "Cálcio",
      "massaAtomica": 40.08,
      "adjacentes" : ["Mg", "K", "Sr", "Sc"],
      "grupo": 2,
      "periodo": 4
    },
    "Sc": {
      "numeroAtomico": 21,
      "simbolo": "Sc",
      "nome": "Escândio",
      "massaAtomica": 44.96,
      "adjacentes" : ["Ca", "Y", "Ti"],
      "grupo": 3,
      "periodo": 4
    },
    "Ti": {
      "numeroAtomico": 22,
      "simbolo": "Ti",
      "nome": "Titânio",
      "massaAtomica": 47.87,
      "adjacentes" : ["Sc", "Zr", "V"],
      "grupo": 4,
      "periodo": 4
    },
    "V": {
      "numeroAtomico": 23,
      "simbolo": "V",
      "nome": "Vanádio",
      "massaAtomica": 50.94,
      "adjacentes" : ["Ti", "Nb", "Cr"],
      "grupo": 5,
      "periodo": 4 
    },
    "Cr": {
      "numeroAtomico": 24,
      "simbolo": "Cr",
      "nome": "Cromo",
      "massaAtomica": 52.00,
      "adjacentes" : ["V", "Mo", "Mn"],
      "grupo": 6,
      "periodo": 4
    },
    "Mn": {
      "numeroAtomico": 25,
      "simbolo": "Mn",
      "nome": "Manganês",
      "massaAtomica": 54.94,
      "adjacentes" : ["Cr", "Tc", "Fe"],
      "grupo": 7,
      "periodo": 4
    },
    "Fe": {
      "numeroAtomico": 26,
      "simbolo": "Fe",
      "nome": "Ferro",
      "massaAtomica": 55.85,
      "adjacentes" : ["Mn", "Ru", "Co"],
      "grupo": 8,
      "periodo": 4
    },
    "Co": {
      "numeroAtomico": 27,
      "simbolo": "Co",
      "nome": "Cobalto",
      "massaAtomica": 58.93,
      "adjacentes" : ["Fe", "Rh", "Ni"],
      "grupo": 9,
      "periodo": 4
    },
    "Ni": {
      "numeroAtomico": 28,
      "simbolo": "Ni",
      "nome": "Níquel",
      "massaAtomica": 58.69,
      "adjacentes" : ["Co", "Pd", "Cu"],
      "grupo": 10,
      "periodo": 4
    },
    "Cu": {
      "numeroAtomico": 29,
      "simbolo": "Cu",
      "nome": "Cobre",
      "massaAtomica": 63.55,
      "adjacentes" : ["Ni", "Ag", "Zn"],
      "grupo": 11,
      "periodo": 4
    },
    "Zn": {
      "numeroAtomico": 30,
      "simbolo": "Zn",
      "nome": "Zinco",
      "massaAtomica": 65.38,
      "adjacentes" : ["Cu", "Cd", "Ga"],
      "grupo": 12,
      "periodo": 4
    },
    "Ga": {
      "numeroAtomico": 31,
      "simbolo": "Ga",
      "nome": "Gálio",
      "massaAtomica": 69.72,
      "adjacentes" : ["Al", "Zn", "In", "Ge"],
      "grupo": 13,
      "periodo": 4
    },
    "Ge": {
      "numeroAtomico": 32,
      "simbolo": "Ge",
      "nome": "Germânio",
      "massaAtomica": 72.63,
      "adjacentes" : ["Si", "Ga", "Sn", "As"],
      "grupo": 14,
      "periodo": 4
    },
    "As": {
      "numeroAtomico": 33,
      "simbolo": "As",
      "nome": "Arsênio",
      "massaAtomica": 74.92,
      "adjacentes" : ["P", "Ge", "Sb", "Se"],
      "grupo": 15,
      "periodo": 4
    },
    "Se": {
      "numeroAtomico": 34,
      "simbolo": "Se",
      "nome": "Selênio",
      "massaAtomica": 78.97,
      "adjacentes" : ["S", "As", "Te", "Br"],
      "grupo": 16,
      "periodo": 4
    },
    "Br": {
      "numeroAtomico": 35,
      "simbolo": "Br",
      "nome": "Bromo",
      "massaAtomica": 79.90,
      "adjacentes" : ["Cl", "Se", "I", "Kr"],
      "grupo": 17,
      "periodo": 4
    },
    "Kr": {
      "numeroAtomico": 36,
      "simbolo": "Kr",
      "nome": "Criptônio",
      "massaAtomica": 83.80,
      "adjacentes" : ["Ar", "Br", "Xe"],
      "grupo": 18,
      "periodo": 4
    },
    "Rb": {
      "numeroAtomico": 37,
      "simbolo": "Rb",
      "nome": "Rubídio",
      "massaAtomica": 85.47,
      "adjacentes" : ["K", "Sr", "Cs"],
      "grupo": 1,
      "periodo": 5
    },
    "Sr": {
      "numeroAtomico": 38,
      "simbolo": "Sr",
      "nome": "Estrôncio",
      "massaAtomica": 87.62,
      "adjacentes" : ["Ca", "Rb", "Ba", "Y"],
      "grupo": 2,
      "periodo": 5
    },
    "Y": {
      "numeroAtomico": 39,
      "simbolo": "Y",
      "nome": "Ítrio",
      "massaAtomica": 88.91,
      "adjacentes" : ["Sc", "Sr", "Zr"],
      "grupo": 3,
      "periodo": 5
    },
    "Zr": {
      "numeroAtomico": 40,
      "simbolo": "Zr",
      "nome": "Zircônio",
      "massaAtomica": 91.22,
      "adjacentes" : ["Ti", "Y", "Hf", "Nb"],
      "grupo": 4,
      "periodo": 5
    },
    "Nb": {
      "numeroAtomico": 41,
      "simbolo": "Nb",
      "nome": "Nióbio",
      "massaAtomica": 92.91,
      "adjacentes" : ["V", "Zr", "Ta", "Mo"],
      "grupo": 5,
      "periodo": 5
    },
    "Mo": {
      "numeroAtomico": 42,
      "simbolo": "Mo",
      "nome": "Molibdênio",
      "massaAtomica": 95.95,
      "adjacentes" : ["Cr", "Nb", "W", "Tc"],
      "grupo": 6,
      "periodo": 5
    },
    "Tc": {
      "numeroAtomico": 43,
      "simbolo": "Tc",
      "nome": "Tecnécio",
      "massaAtomica": 98.00,
      "adjacentes" : ["Mn", "Mo", "Re", "Ru"],
      "grupo": 7,
      "periodo": 5
    },
    "Ru": {
      "numeroAtomico": 44,
      "simbolo": "Ru",
      "nome": "Rutênio",
      "massaAtomica": 101.1,
      "adjacentes" : ["Fe", "Tc", "Os", "Rh"],
      "grupo": 8,
      "periodo": 5
    },
    "Rh": {
      "numeroAtomico": 45,
      "simbolo": "Rh",
      "nome": "Ródio",
      "massaAtomica": 102.9,
      "adjacentes" : ["Co", "Ru", "Ir", "Pd"],
      "grupo": 9,
      "periodo": 5
    },
    "Pd": {
      "numeroAtomico": 46,
      "simbolo": "Pd",
      "nome": "Paládio",
      "massaAtomica": 106.4,
      "adjacentes" : ["Ni", "Rh", "Pt", "Ag"],
      "grupo": 10,
      "periodo": 5
    },
    "Ag": {
      "numeroAtomico": 47,
      "simbolo": "Ag",
      "nome": "Prata",
      "massaAtomica": 107.9,
      "adjacentes" : ["Cu", "Pd", "Au", "Cd"],
      "grupo": 11,
      "periodo": 5
    },
    "Cd": {
      "numeroAtomico": 48,
      "simbolo": "Cd",
      "nome": "Cádmio",
      "massaAtomica": 112.4,
      "adjacentes" : ["Zn", "Ag", "Hg", "In"],
      "grupo": 12,
      "periodo": 5
    },
    "In": {
      "numeroAtomico": 49,
      "simbolo": "In",
      "nome": "Índio",
      "massaAtomica": 114.8,
      "adjacentes" : ["Ga", "Cd", "Tl", "Sn"],
      "grupo": 13,
      "periodo": 5
    },
    "Sn": {
      "numeroAtomico": 50,
      "simbolo": "Sn",
      "nome": "Estanho",
      "massaAtomica": 118.7,
      "adjacentes" : ["Ge", "In", "Pb", "Sb"],
      "grupo": 14,
      "periodo": 5
    },
    "Sb": {
      "numeroAtomico": 51,
      "simbolo": "Sb",
      "nome": "Antimônio",
      "massaAtomica": 121.8,
      "adjacentes" : ["As", "Sn", "Bi", "Te"],
      "grupo": 15,
      "periodo": 5
    },
    "Te": {
      "numeroAtomico": 52,
      "simbolo": "Te",
      "nome": "Telúrio",
      "massaAtomica": 127.6,
      "adjacentes" : ["Se", "Sb", "Po", "I"],
      "grupo": 16,
      "periodo": 5
    },
    "I": {
      "numeroAtomico": 53,
      "simbolo": "I",
      "nome": "Iodo",
      "massaAtomica": 126.9,
      "adjacentes" : ["Br", "Te", "At", "Xe"],
      "grupo": 17,
      "periodo": 5
    },
    "Xe": {
      "numeroAtomico": 54,
      "simbolo": "Xe",
      "nome": "Xenônio",
      "massaAtomica": 131.3,
      "adjacentes" : ["Kr", "I", "Rn"],
      "grupo": 18,
      "periodo": 5
    },
    "Cs": {
      "numeroAtomico": 55,
      "simbolo": "Cs",
      "nome": "Césio",
      "massaAtomica": 132.9,
      "adjacentes" : ["Rb", "Ba", "Fr"],
      "grupo": 1,
      "periodo": 6
    },
    "Ba": {
      "numeroAtomico": 56,
      "simbolo": "Ba",
      "nome": "Bário",
      "massaAtomica": 137.3,
      "adjacentes" : ["Sr", "Cs", "Ra"],
      "grupo": 2,
      "periodo": 6
    },
    "Hf": {
      "numeroAtomico": 72,
      "simbolo": "Hf",
      "nome": "Háfnio",
      "massaAtomica": 178.5,
      "adjacentes" : ["Zr", "Rf", "Ta"],
      "grupo": 4,
      "periodo": 6
    },
    "Ta": {
      "numeroAtomico": 73,
      "simbolo": "Ta",
      "nome": "Tântalo",
      "massaAtomica": 180.9,
      "adjacentes" : ["Nb", "Hf", "Db", "W"],
      "grupo": 5,
      "periodo": 6
    },
    "W": {
      "numeroAtomico": 74,
      "simbolo": "W",
      "nome": "Tungstênio",
      "massaAtomica": 183.8,
      "adjacentes" : ["Mo", "Ta", "Sg", "Re"],
      "grupo": 6,
      "periodo": 6
    },
    "Re": {
      "numeroAtomico": 75,
      "simbolo": "Re",
      "nome": "Rênio",
      "massaAtomica": 186.2,
      "adjacentes" : ["Tc", "W", "Bh", "Os"],
      "grupo": 7,
      "periodo": 6
    },
    "Os": {
      "numeroAtomico": 76,
      "simbolo": "Os",
      "nome": "Ósmio",
      "massaAtomica": 190.2,
      "adjacentes" : ["Ru", "Re", "Hs", "Ir"],
      "grupo": 8,
      "periodo": 6
    },
    "Ir": {
      "numeroAtomico": 77,
      "simbolo": "Ir",
      "nome": "Irídio",
      "massaAtomica": 192.2,
      "adjacentes" : ["Rh", "Os", "Mt", "Pt"],
      "grupo": 9,
      "periodo": 6
    },
    "Pt": {
      "numeroAtomico": 78,
      "simbolo": "Pt",
      "nome": "Platina",
      "massaAtomica": 195.1,
      "adjacentes" : ["Pd", "Ir", "Ds", "Au"],
      "grupo": 10,
      "periodo": 6
    },
    "Au": {
      "numeroAtomico": 79,
      "simbolo": "Au",
      "nome": "Ouro",
      "massaAtomica": 197.0,
      "adjacentes" : ["Ag", "Pt", "Rg", "Hg"],
      "grupo": 11,
      "periodo": 6
    },
    "Hg": {
      "numeroAtomico": 80,
      "simbolo": "Hg",
      "nome": "Mercúrio",
      "massaAtomica": 200.6,
      "adjacentes" : ["Cd", "Au", "Cn", "Tl"],
      "grupo": 12,
      "periodo": 6
    },
    "Tl": {
      "numeroAtomico": 81,
      "simbolo": "Tl",
      "nome": "Tálio",
      "massaAtomica": 204.4,
      "adjacentes" : ["In", "Hg", "Nh", "Pb"],
      "grupo": 13,
      "periodo": 6
    },
    "Pb": {
      "numeroAtomico": 82,
      "simbolo": "Pb",
      "nome": "Chumbo",
      "massaAtomica": 207.2,
      "adjacentes" : ["Sn", "Tl", "Fl", "Bi"],
      "grupo": 14,
      "periodo": 6
    },
    "Bi": {
      "numeroAtomico": 83,
      "simbolo": "Bi",
      "nome": "Bismuto",
      "massaAtomica": 208.9,
      "adjacentes" : ["Sb", "Pb", "Mc", "Po"],
      "grupo": 15,
      "periodo":  6
    },
    "Po": {
      "numeroAtomico": 84,
      "simbolo": "Po",
      "nome": "Polônio",
      "massaAtomica": 209.0,
      "adjacentes" : ["Te", "Bi", "Lv", "At"],
      "grupo": 16,
      "periodo": 6
    },
    "At": {
      "numeroAtomico": 85,
      "simbolo": "At",
      "nome": "Ástato",
      "massaAtomica": 210.0,
      "adjacentes" : ["I", "Po", "Ts", "Rn"],
      "grupo": 17,
      "periodo": 6
    },
    "Rn": {
      "numeroAtomico": 86,
      "simbolo": "Rn",
      "nome": "Radônio",
      "massaAtomica": 222.0,
      "adjacentes" : ["Xe", "At", "Og"],
      "grupo": 18,
      "periodo": 6
    },
    "Fr": {
      "numeroAtomico": 87,
      "simbolo": "Fr",
      "nome": "Frâncio",
      "massaAtomica": 223.0,
      "adjacentes" : ["Cs", "Ra"],
      "grupo": 1,
      "periodo": 7
    },
    "Ra": {
      "numeroAtomico": 88,
      "simbolo": "Ra",
      "nome": "Rádio",
      "massaAtomica": 226.0,
      "adjacentes" : ["Ba", "Fr"],
      "grupo": 2,
      "periodo": 7
    },
    "Rf": {
      "numeroAtomico": 104,
      "simbolo": "Rf",
      "nome": "Rutherfórdio",
      "massaAtomica": 267.0,
      "adjacentes" : ["Hf", "Db"],
      "grupo": 4,
      "periodo": 7
    },
    "Db": {
      "numeroAtomico": 105,
      "simbolo": "Db",
      "nome": "Dúbnio",
      "massaAtomica": 270.0,
      "adjacentes" : ["Ta", "Rf", "Sg"],
      "grupo": 5,
      "periodo": 7
    },
    "Sg": {
      "numeroAtomico": 106,
      "simbolo": "Sg",
      "nome": "Seabórgio",
      "massaAtomica": 271.0,
      "adjacentes" : ["W", "Db", "Bh"],
      "grupo": 6,
      "periodo": 7
    },
    "Bh": {
      "numeroAtomico": 107,
      "simbolo": "Bh",
      "nome": "Bóhrio",
      "massaAtomica": 270.0,
      "adjacentes" : ["Re", "Sg", "Hs"],
      "grupo": 7,
      "periodo": 7
    },
    "Hs": {
      "numeroAtomico": 108,
      "simbolo": "Hs",
      "nome": "Hássio",
      "massaAtomica": 277.0,
      "adjacentes" : ["Os", "Bh", "Mt"],
      "grupo": 8,
      "periodo": 7
    },
    "Mt": {
      "numeroAtomico": 109,
      "simbolo": "Mt",
      "nome": "Meitnério",
      "massaAtomica": 278.0,
      "adjacentes" : ["Ir", "Hs", "Ds"],
      "grupo": 9,
      "periodo": 7
    },
    "Ds": {
      "numeroAtomico": 110,
      "simbolo": "Ds",
      "nome": "Darmstádio",
      "massaAtomica": 281.0,
      "adjacentes" : ["Pt", "Mt", "Rg"],
      "grupo": 10,
      "periodo": 7
    },
    "Rg": {
      "numeroAtomico": 111,
      "simbolo": "Rg",
      "nome": "Roentgênio",
      "massaAtomica": 282.0,
      "adjacentes" : ["Au", "Ds", "Cn"],
      "grupo": 11,
      "periodo": 7
    },
    "Cn": {
      "numeroAtomico": 112,
      "simbolo": "Cn",
      "nome": "Copernício",
      "massaAtomica": 285.0,
      "adjacentes" : ["Hg", "Rg", "Nh"],
      "grupo": 12,
      "periodo": 7
    },
    "Nh": {
      "numeroAtomico": 113,
      "simbolo": "Nh",
      "nome": "Nihônio",
      "massaAtomica": 286.0,
      "adjacentes" : ["Tl", "Cn", "Fl"],
      "grupo": 13,
      "periodo": 7
    },
    "Fl": {
      "numeroAtomico": 114,
      "simbolo": "Fl",
      "nome": "Fleróvio",
      "massaAtomica": 289.0,
      "adjacentes" : ["Pb", "Nh", "Mc"],
      "grupo": 14,
      "periodo": 7
    },
    "Mc": {
      "numeroAtomico": 115,
      "simbolo": "Mc",
      "nome": "Moscóvio",
      "massaAtomica": 290.0,
      "adjacentes" : ["Bi", "Fl", "Lv"],
      "grupo": 15,
      "periodo": 7
    },
    "Lv": {
      "numeroAtomico": 116,
      "simbolo": "Lv",
      "nome": "Livermório",
      "massaAtomica": 293.0,
      "adjacentes" : ["Po", "Mc", "Ts"],
      "grupo": 16,
      "periodo": 7
    },
    "Ts": {
      "numeroAtomico": 117,
      "simbolo": "Ts",
      "nome": "Tenessino",
      "massaAtomica": 294.0,
      "adjacentes" : ["At", "Lv", "Og"],
      "grupo": 17,
      "periodo": 7
    },
    "Og": {
      "numeroAtomico": 118,
      "simbolo": "Og",
      "nome": "Oganessônio",
      "massaAtomica": 294.0,
      "adjacentes" : ["Rn", "Ts"],
      "grupo": 18,
      "periodo": 7
    }
  }
'''

#cria grafo e nos
def gerar_grafo(elementos):
    g = nx.Graph()

    # Adiciona os nós
    for i in elementos.keys():
        simbolo = elementos[i]["simbolo"]
        n = elementos[i]["numeroAtomico"]
        m = elementos[i]["massaAtomica"]
        gr = elementos[i]["grupo"]
        p = elementos[i]["periodo"]
        g.add_node(simbolo, massaAtomica=m,numeroAtomico=n, grupo=gr, periodo=p)

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
                g.add_edge(simbolo, adjacente, weight=(valor1+valor2))
    return g

def caminho_mais_curto(g, no_inicial, no_objetivo):
    return nx.shortest_path(g, source=no_inicial, target=no_objetivo, weight='weight', method='dijkstra')

def heuristica(g, no_inicial, no_objetivo, admissivel):
    # Calcular função heurística do nó inicial ao objetivo
    if all(node in g.nodes() for node in [no_inicial, no_objetivo]):
        massa_atomica_inicial = g.nodes[no_inicial]['massaAtomica']
        numero_atomica_inicial = g.nodes[no_inicial]['numeroAtomico']
        grupo_inicial = g.nodes[no_inicial]['grupo']
        periodo_inicial = g.nodes[no_inicial]['periodo']

        massa_atomica_objetivo = g.nodes[no_objetivo]['massaAtomica']
        numero_atomica_objetivo = g.nodes[no_objetivo]['numeroAtomico']
        grupo_objetivo = g.nodes[no_objetivo]['grupo']
        periodo_objetivo = g.nodes[no_objetivo]['periodo']

        if(admissivel == True):
            h1 = abs((0.3*grupo_objetivo) * (0.7*periodo_objetivo)) - ((0.3*grupo_inicial) * (0.7*periodo_inicial))
            h2 = abs(numero_atomica_objetivo - numero_atomica_inicial)
            h3 = (h1 + h2)
        else:
            h3 = abs(massa_atomica_inicial - massa_atomica_objetivo) * abs(numero_atomica_objetivo - numero_atomica_inicial)
        # função de avaliação
        hx = h3
    else:
        if no_inicial not in g.nodes():
            print(f"Nó {no_inicial} não foi encontrado no grafo.")
        if no_objetivo not in g.nodes():
            print(f"Nó {no_objetivo} não foi encontrado no grafo.")

    return hx

def custo_melhor_caminho(grafo, elementos):
    custo_total = 0

    # Verifica pares de elementos adjacentes
    for i in range(len(elementos) - 1):
        no_atual = elementos[i]
        prox_no = elementos[i + 1]
        custo = grafo[no_atual][prox_no]['weight']
        custo_total += custo

    return custo_total


elementos = json.loads(json_elementos)
g = gerar_grafo(elementos)
# fazer todas as combinações de nos do grafo para testar heuristica
for inicio in g.nodes():
    for final in g.nodes():
        if((argFromIAprojeto) == True):
            hx = heuristica(g, inicio, final, True)
        else:
            hx = heuristica(g, inicio, final, False)
        caminho = caminho_mais_curto(g, inicio, final)
        custo_total = custo_melhor_caminho(g, caminho)
        if hx > custo_total:
            print("ERROR")
            print(f"No inicio:{inicio}, No final: {final}\nH(x): {hx}, Custo: {custo_total}")
            #exit()