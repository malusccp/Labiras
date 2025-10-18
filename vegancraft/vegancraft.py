
from utils import choose_level, clear_screen, enter_to_continue, pedir_valores
from setup import converter_estoque, criar_item
import pandas as pd


livro_receitas = {
    "50": {'item': 'Tocha', 'ingredientes': {'263': 1, '280': 1}},
    "297": {'item': 'Pão', 'ingredientes': {"296": 3}},
    "261": {'item': 'Arco', 'ingredientes': {'280': 3, '287': 3}},
    "280": {'item': 'Graveto', 'ingredientes': {'540': 2}},
    "322": {'item': 'Maçã Dourada', 'ingredientes': {'262': 1, '321': 8}},
    "354": {'item': 'Bolo', 'ingredientes': {'353': 2, '344': 1, '296': 3, '334': 3}}
}

estoque = [
    {'id': '263','Nome': 'Carvão', 'Quantidade': 64},   
    {'id': '540','Nome':'Tábuas de Madeira', 'Quantidade': 128},  
    {'id': '296','Nome':'Trigo', 'Quantidade': 45},   
    {'id': '287','Nome':'Linha', 'Quantidade': 12},   
    {'id': '262','Nome':'Maçã', 'Quantidade': 8},    
    {'id': '321', 'Nome':'Pepita de Ouro', 'Quantidade': 24}, 
    {'id': '353','Nome':'Açúcar', 'Quantidade': 15},   
    {'id': '344','Nome':'Ovo', 'Quantidade': 6},    
    {'id': '334', 'Nome':'Balde de Leite', 'Quantidade': 3}     
]



def main():
    id_nome = {id: data['item'] for id, data in livro_receitas.items()}
    for item_dict in estoque:
        if item_dict['id'] not in id_nome:
            id_nome[item_dict['id']] = item_dict['Nome']

    estoque_matriz = converter_estoque(estoque)
    while True:

        print(menu_arte)
        print(opcoes_menu)
        level = choose_level("Escolha a ação a ser realizada: ")

        if level == exibir_estoque:
            clear_screen()
            mostrar_estoque(estoque_matriz, id_nome)
            enter_to_continue()
        elif level == exibir_receitas:
            clear_screen()
            mostrar_receitas()
            enter_to_continue()
        elif level == gerar_item:
            clear_screen()
            id_item, quantidade = pedir_valores(livro_receitas)
            if id_item and quantidade:
                estoque_matriz = criar_item(id_item, livro_receitas, estoque_matriz, quantidade, id_nome)
            enter_to_continue()


        elif level == sair:
            clear_screen()
            break


menu_arte = """

'                                                           '
'              //                           \\              '
'                   V E G A N C R A F T                      '
'              \\                           //              '
'                  O Atelie da Natureza                     '
'                                                           '

"""
opcoes_menu = """
     👋 Ola, artesao(a) da terra! O que vamos criar hoje?

        [1] 🧺 Consultar o Estoque
        [2] 📖 Ver o Livro de Receitas
        [3] 🛠️ Criar um novo Item
        [4] 🏡 Voltar para a Clareira (Sair)

~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~
"""

def mostrar_receitas():
    receitas =  """
                                📖 Livro de Receitas Vegancraft 📖
╔═══════════════════╦══════╦════════════════════════════════════════════════════════════╗
║ Item a Criar      ║ (ID) ║ Ingredientes                                               ║
╠═══════════════════╬══════╬════════════════════════════════════════════════════════════╣
║ Tocha             ║ 50   ║ 1x Carvão, 1x Graveto                                      ║
║ Pão               ║ 297  ║ 3x Trigo                                                   ║
║ Arco              ║ 261  ║ 3x Graveto, 3x Linha                                       ║
║ Graveto           ║ 280  ║ 2x Tábuas de Madeira                                       ║
║ Maçã Dourada      ║ 322  ║ 1x Maçã, 8x Pepita de Ouro                                 ║
║ Bolo              ║ 354  ║ 2x Açúcar, 1x Ovo, 3x Trigo, 3x Balde de Leite             ║
╚═══════════════════╩══════╩════════════════════════════════════════════════════════════╝
"""
    print(receitas)



def mostrar_estoque(estoque, id_nome):
    print("\n--- 🗃️  ESTOQUE ATUAL 🗃️ ---")
    
    df = pd.DataFrame(estoque, columns=['ID', 'Quantidade'])
    df = df[df['Quantidade'] > 0].copy()

    df['ID'] = df['ID'].astype(int)
    df['Quantidade'] = df['Quantidade'].astype(int)

    df['Item'] = df['ID'].astype(str).map(id_nome).fillna('Item Desconhecido')

    df_para_mostrar = df.sort_values(by='ID')[['ID', 'Item', 'Quantidade']]
    

    if df_para_mostrar.empty:
        print("O estoque está vazio.")
    else:
        print(df_para_mostrar.to_string(index=False))
    
    print("=" * 40 + "\n")

# Constantes
exibir_estoque = 1
exibir_receitas = 2
gerar_item = 3
sair = 4

main()
