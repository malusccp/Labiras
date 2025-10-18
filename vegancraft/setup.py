
import numpy as np


def converter_estoque(estoque):
  itens = []
  for item in estoque:
      itens.append([float(item['id']), item['Quantidade']])
  matriz_numpy = np.array(itens, dtype=float)

  return matriz_numpy

def calcular_ingredientes(id_item, receitas, quantidade_desejada):
    materias_primas_finais = {}
    fila = [(id_item, quantidade_desejada)]

    while fila:
        item_atual_id, quantidade_atual = fila.pop(0)

        if item_atual_id in receitas:
            for id_ingrediente, qtd_por_unidade in receitas[item_atual_id]['ingredientes'].items():
                qtd_total_ingrediente = quantidade_atual * qtd_por_unidade
                fila.append((id_ingrediente, qtd_total_ingrediente))
        else:
            if item_atual_id not in materias_primas_finais:
                materias_primas_finais[item_atual_id] = 0
            materias_primas_finais[item_atual_id] += quantidade_atual

    return materias_primas_finais


def verificar_estoque(id_item, ingredientes, estoque_lista):
    estoque_disponivel = True
    estoque_dict = {item[0]: int(item[2]) for item in estoque_lista}

    for ingrediente, quantidade_necessaria in ingredientes.items():
        qtd_em_estoque = estoque_dict.get(ingrediente, 0)


        if qtd_em_estoque < quantidade_necessaria:
            estoque_disponivel = False

    return estoque_disponivel


def criar_item(id_item_desejado, receitas, estoque_lista, quantidade_desejada, id_nome):
    nome_item = id_nome.get(id_item_desejado, f"Item ID {id_item_desejado}")

    ingredientes = calcular_ingredientes(id_item_desejado, receitas, quantidade_desejada)
    possui_recursos = True

    for id_item_ingrediente, qtd_necessaria in ingredientes.items():
        id_ingrediente_float = float(id_item_ingrediente)

        mascara = (estoque_lista[:, 0] == id_ingrediente_float)
        nome_ingrediente = id_nome.get(id_item_ingrediente, f"ID {id_item_ingrediente}")

        if not np.any(mascara):
            print(f"[FALHA] Matéria-prima '{nome_ingrediente}' não existe no estoque.")
            possui_recursos = False
            break
        else:
            qtd_estoque = estoque_lista[mascara, 1][0]
            if qtd_estoque < qtd_necessaria:
                print(f"[FALHA] Quantidade Insuficiente de '{nome_item}'.")
                possui_recursos = False
                break
    if not possui_recursos:
            print(f"=> FALHA: Recursos insuficientes para criar {nome_item}. O estoque NÃO foi alterado.")
            return estoque_lista

    novo_estoque = np.copy(estoque_lista)
        
    for id_materia_str, qtd_necessaria in ingredientes.items():
        id_materia_float = float(id_materia_str)
        mascara_item = (novo_estoque[:, 0] == id_materia_float)
            
        novo_estoque[mascara_item, 1] -= qtd_necessaria

    id_final_float = float(id_item_desejado)
    mascara_final = (novo_estoque[:, 0] == id_final_float)
        
    if np.any(mascara_final):
        novo_estoque[mascara_final, 1] += quantidade_desejada
    else:
        nova_linha = np.array([[id_final_float, quantidade_desejada]], dtype=float)
        novo_estoque = np.vstack((novo_estoque, nova_linha))
            
    print(f"=> SUCESSO! Criado {quantidade_desejada}x '{nome_item}'.")
        
    return novo_estoque




