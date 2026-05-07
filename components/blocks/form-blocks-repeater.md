#  O Componente: FormBlocksRepeater
O `<form-blocks-repeater>` é o componente responsável por gerenciar listas dinâmicas de campos. Ele permite que o usuário adicione ou remova "blocos" de informações (como múltiplos endereços, telefones ou dependentes) de forma reativa.

## Funcionalidades Principais
- **Gerenciamento Automático de Array:** Inicializa e manipula arrays no formData global.

- **Clonagem Profunda (Deep Clone):** Garante que novos itens sejam cópias limpas do modelo original, sem referências de memória compartilhadas.

- **Soft Delete:** Implementa uma lógica inteligente onde itens vindos do banco de dados são marcados como deleted: true em vez de serem excluídos do array, facilitando o controle no backend.

- **IDs Únicos:** Gera IDs aleatórios para garantir que os labels e inputs de cada item da lista não conflitem entre si.

## Lógica de Dados
### Inicialização
Ao ser montado (`onMounted`), se o array definido em `groupModel` estiver vazio, o repetidor chama automaticamente o método `addItem()` para garantir que o usuário veja ao menos um bloco de campos disponível.

### O Método removeItem
Diferente de um splice comum, o repetidor segue a seguinte lógica:

1. Se o item possui a propriedade type (indicando que já existe no backend), ele recebe deleted: true.

2. A linha no formulário ganha a classe CSS .fb-disabled-row-repeater, ficando visualmente desabilitada.

3. Se for um item novo (criado localmente), ele é removido do array imediatamente.

## Componentes Filhos
O repetidor divide sua carga de trabalho em dois níveis:

1. **FormBlocksRepeater:** Orquestra o array global, renderiza o `TransitionGroup` (para animações de entrada/saída) e os botões principais.

2. **FormBlocksRepeaterItem:** Renderiza cada linha individual. Ele gera um uniqueId para cada input, garantindo que o atributo `for` do `<label>` aponte para o input correto dentro daquela linha específica.

## Exemplo de Uso (DSL)
Para ativar o repetidor em um grupo, utilize a flag `isRepeater` no seu `groupBase`:

```javascript
{
  title: 'Contatos',
  isRepeater: true,
  groupModel: 'contacts',
  groupFormData: { type: null, value: '' }, // Molde do item
  forms: [
    ['Tipo::select:md4', typeOptions],
    'Valor::md8',
  ],
}
```

## Slots e Customização
Você pode interceptar a renderização do repetidor de duas formas:

1. **Customização Global do Botão**
Através das repeaterProps no objeto do grupo, você pode passar variantes de cores e texturas suportadas pelo seu design system.

2. **Slot de Customização Total**
Se precisar de um layout de repetidor completamente diferente (ex: uma tabela em vez de rows), use o slot `form-repeater` no componente `FormBlocks`:

```vue
<template #form-repeater="{ form, groupModel }">
  <!-- Sua implementação personalizada de loop -->
</template>
```

## Backdoor
### Props

| Prop | Tipo | Default | Descrição |
|------|:----:|:-----------:|-----------|
| forms|Array| [] | A definição dos campos que serão repetidos. |
| groupModel|String| 'groups' | A chave no formData onde os dados serão salvos. |
| groupFormData|Object| {} | O objeto inicial de um novo item (molde). |
| btnAddVariant|String| 'primary' | Estilo do botão "Adicionar". |
| btnAddTexture|String| 'carbon' | Adiciona uma das seguites texturas ao botão "Adicionar". (carbon, stripes, grid, waves) |
| btnAddClean|Boolean| false | Remove a textura do botão "Adicionar". |
| btnRemoveVariant|String| 'danger' | Estilo do botão "Remover". |
| btnRemoveTexture|String| 'carbon' | Adiciona uma das seguites texturas ao botão "Remover". (carbon, stripes, grid, waves) |
| btnRemoveClean|Boolean| false | Remove a textura do botão "Remover". |
| noTexture|Boolean| false | Remove texturas dos botões. |