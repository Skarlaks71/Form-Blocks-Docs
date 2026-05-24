# O Componente: FormGroupBlocks
O `<form-group-blocks>` é o componente de layout que encapsula um conjunto de campos. Ele gerencia títulos de seção, regras de visibilidade condicional e a alternância entre campos simples e campos repetíveis **(Repeaters)**.

## Responsabilidades
1. **Layout:** Organiza os inputs dentro de uma `FbRow`.

2. **Visibilidade Dinâmica:** Controla se o grupo deve ser exibido baseado na prop `dependent`.

3. **Encadeamento de Slots:** Repassa slots de customização vindos do componente pai para os inputs filhos.

4. **Integração com Repeater:** Ativa o modo de lista dinâmica caso a flag `isRepeater` esteja presente.

## Estrutura do Objeto (Prop group)
O `FormGroupBlocks` recebe um objeto de configuração que aceita as seguintes propriedades:

| Propriedade | Tipo | Descrição |
| ----------- |:----:| --------- |
| title | String | O título exibido no topo do grupo. |
| noTitle | Boolean | Se `true`, oculta o título e remove o espaçamento extra. |
| groupModel | String | O nome da chave no formData que conterá o array (ex: `'telefones'`). |
| groupFormData | Object | O objeto "molde" para novos itens (ex: `{ numero: '', tipo: 'celular' }`). |
| isRepeater | Boolean | Transforma o grupo em uma lista dinâmica de campos. |
| repeaterProps | Object | Props enviadas diretamente para o botão de adicionar/remover (como btnAddVariant). |
| dependent | Boolean | Um valor reativo que, se `false`, desmonta o grupo inteiro. |
| forms | Array | A lista de inputs (objetos) pertencentes ao grupo. |

Quando `isRepeater: true` é detectado, o componente delega a renderização para o `FormBlocksRepeater`.

## Visibilidade Condicional (dependent)
Uma das funcionalidades mais poderosas do `FormGroupBlocks` é a capacidade de reagir ao estado do formulário.

```javascript
const { groupBase } = useFormHandle()

// Exemplo: O grupo de "Dados da Empresa" só aparece se 'tipo_pessoa' for 'PJ'
groupBase[1].dependent = computed(() => formData.value.tipo_pessoa === 'PJ')
```

Se `dependent.value` for `false`, o componente retorna `null` e nenhum HTML deste grupo é renderizado no DOM.

## Slots Customizados
Você pode substituir a renderização padrão de um grupo específico usando o slot dinâmico no FormBlocks.vue.

**Slot de Grupo Customizado**
```vue
<template #group(nome_do_grupo)="{ group, index }">
  <div class="meu-grupo-com-borda">
    <h3>{{ group.title }}</h3>
    <!-- Renderização manual dos campos se necessário -->
  </div>
</template>
```

**Slot do Repetidor**
Caso precise mudar a lógica visual de todos os repetidores do projeto:

```vue
<template #form-repeater="{ form, groupModel }">
  <MinhaListaCustomizada :items="formData[groupModel]" />
</template>
```

## Detalhes de Implementação
- **Prefixação de Classes:** O componente utiliza o PREFIX global para garantir que os estilos não conflitem com outros frameworks (ex: `fb-group__title`).

- **Animações:** Todo o grupo é envolvido em um componente `<Transition>`, aplicando um efeito de fade suave quando o grupo aparece ou desaparece via dependent.

- **Espaçamento Automático:** Grupos subsequentes (com groupKey > 0) recebem automaticamente uma margem superior (`mt-12`) para garantir a hierarquia visual.

## Pro-Tip: Grupos sem Título
Use `noTitle: true` para criar divisões apenas lógicas no seu código ou para organizar o grid de campos sem adicionar ruído visual na interface do usuário.

## Backdoor
### Props

| Prop | Tipo | Default | Descrição |
|------|:----:|-------------|-----------|
|group |Object| {} | Objeto usado para configurar o grupo de forms atual. |
| groupKey | Number, String | 0 | - |