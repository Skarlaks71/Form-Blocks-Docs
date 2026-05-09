# O Registry
O **Registry** é o "catálogo" de componentes do Form Blocks. Quando você define um campo via DSL como `'Nome::text'`, o framework consulta este catálogo para saber qual componente Vue deve renderizar para a chave `text` (ou `select`, `checkbox`, etc).

Ele já vem configurado com um conjunto padrão de componentes, mas sua arquitetura permite que você substitua os padrões ou adicione novos componentes facilmente.

## Componentes Padrão
Por padrão, o framework já registra os seguintes mapeamentos:

|Chave DSL|	Componente Original| supportsLabelFor|
|---------|--------------------|-----------------|
|input| FbInput| Sim|
|select| VSelect| Não|
|flatpickr| flatPickr| Não|
|textarea| FbTextarea| Sim|
|radio| FbRadio| Não|
|checkbox| FbCheckbox| Não|

## Registrando Novos Componentes
Para adicionar um componente customizado (ex: um editor Rich Text ou um Upload de Arquivos), utilize a função `registerComponent`.

Recomendamos fazer isso no seu arquivo de entrada (`main.js`), logo após a instalação do plugin.

```javascript
import { registerComponent } from '@form-blocks/vue'
import MyCustomUpload from './components/MyCustomUpload.vue'

// Registrando o componente
registerComponent('upload', MyCustomUpload, {
  supportsLabelFor: false 
})
```

Agora, você pode usá-lo em qualquer lugar via DSL ou Objeto:

```javascript
// Na DSL
'Avatar::upload:md4'

// No Objeto
{ label: 'Avatar', component: 'upload' }
```

## Propriedades do Registro (Meta)
Ao registrar um componente, você pode passar um objeto de metadados:

- **component:** O componente Vue importado (obrigatório).

- **supportsLabelFor:** (Boolean) Define se o componente de UI possui um ID interno que pode ser focado via `<label for="ID">`.
  - **Nota:** Componentes como Selects customizados muitas vezes não expõem o input real, então definimos como `false` para evitar comportamentos inesperados de acessibilidade.

## Substituindo Componentes Padrão
Se você não gosta do VSelect padrão ou quer usar um Input próprio em vez do FbInput, basta registrar um novo componente usando a **mesma chave**:

```javascript
import MyDesignSystemInput from './components/MyDesignSystemInput.vue'

// Substitui o input padrão do framework pelo seu
registerComponent('input', MyDesignSystemInput)
```

Dessa forma, toda a sua aplicação passará a usar o `MyDesignSystemInput` automaticamente quando a DSL for processada.

## Requisitos para Componentes Customizados
Para que seu componente funcione perfeitamente com o Form Blocks, ele deve seguir a convenção padrão do Vue 3 para `v-model`:

**Prop:** Deve aceitar uma prop chamada `modelValue`.

**Event:** Deve emitir um evento `update:modelValue` quando o valor mudar.

```vue
<!-- Exemplo de componente compatível -->
<script setup>
  defineProps(['modelValue'])
  defineEmits(['update:modelValue'])
</script>
<template>
  <input 
    :value="modelValue" 
    @input="$emit('update:modelValue', $event.target.value)" 
  />
</template>
```

## Dica de Organização
Se o seu projeto utiliza muitos componentes de terceiros, crie um arquivo chamado `form-blocks-setup.js` para centralizar todos os seus registerComponent e importe-o no seu main.js. Isso mantém o código de inicialização limpo e fácil de manter.
