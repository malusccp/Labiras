import os

def get_integer_number(label: str):
    entrada = input(label)

    try:
        numero = int(entrada)
    except ValueError:
        print('Valor inteiro inválido!')
        numero = get_integer_number(label)

    return numero

def get_integer_positive(label: str):
    numero = get_integer_number(label)

    while numero < 0:
        print('A quantidade deve ser maior que 0 !')
        numero = get_integer_number(label)
    return numero

def choose_level(label: str):

    while True:
        numero = get_integer_number(label)
        if 1 <= numero <= 3:
            return numero

        print(f"Comando inválido! ")

def clear_screen():
    os.system('cls')


def pedir_valores(receitas):
    
    id_item = input("Digite o ID do item que deseja criar: ")
    
    if id_item not in receitas:
        print("\nErro: ID de receita inválido!")
        return None, None 
        
    try:
        quantidade = int(input("Digite a quantidade: "))
        if quantidade <= 0:
            print("\nErro: Quantidade deve ser positiva.")
            return None, None
    except ValueError:
        print("\nErro: Quantidade inválida.")
        return None, None
        
    return id_item, quantidade

def enter_to_continue():
    input("Aperte <ENTER> para continuar...")
    clear_screen()
