# O Componente: FbRadio
O `<fb-radio>` gerencia a renderização de grupos de seleção exclusiva (tipo _Radio Button_). Ele encapsula as tags de input nativas garantindo o agrupamento correto através do atributo `name`, além de oferecer suporte a layouts responsivos e variantes de botões estilizados.

## Funcionalidades
- **Seleção Exclusiva Nativa:** Força o comportamento correto do navegador ao exigir e gerenciar a propriedade obrigatória name.

- **Modo Botão Integrado:** Substitui o círculo clássico do radio por blocos de botões encadeados com controle automático de bordas (`--is-first e --is-last`).

- **Alinhamento Sob Demanda:** Alterna facilmente entre exibição em lista (_vertical_) ou lado a lado (_inline_).

- **Estados de Validação:** Repassa classes de validação e desabilita opções individualmente através do array de configurações.

## Como usar
1. **Uso Tradicional (Lista Vertical)**
   
Ideal para questionários estruturados comuns.

```html
<script setup>
const genero = ref(null)
const listaGeneros = [
  { label: 'Masculino', value: 'M' },
  { label: 'Feminino', value: 'F' },
  { label: 'Não informar', value: 'N' }
]
</script>

<template>
  <fb-radio 
    v-model="genero" 
    name="genero_usuario"
    :options="listaGeneros"
  />
</template>
```

2. **Disposição Horizontal (inline)**
   
Ideal para perguntas curtas de Sim ou Não que economizam espaço vertical na tela.

```vue
<fb-radio 
  v-model="aceitaTermos" 
  name="aceita_termos"
  inline
  :options="[
    { label: 'Sim', value: true },
    { label: 'Não', value: false }
  ]"
/>
```

3. **Variante Segmentada por Botões (button)**
   
Uma alternativa moderna a caixas de seleção tradicionais, muito usada para escolhas rápidas de planos ou tamanhos:

```vue
<fb-radio 
  v-model="tamanhoCamisa" 
  name="tamanho_produto"
  button
  button-variant="outline-secondary"
  :options="[
    { label: 'P', value: 'p' },
    { label: 'M', value: 'm' },
    { label: 'G', value: 'g', disabled: true },
    { label: 'GG', value: 'gg' }
  ]"
/>
```

## Classes e Estrutura BEM
Seguindo o padrão arquitetural de estilos do framework:

- **.fb-radio-group:** O container principal do grupo.

    - **Modificadores:** `--stacked` (em lista vertical) ou `--inline` (lado a lado).

- **.fb-radio:** O container isolado que envelopa cada opção (`input + label`).

- **.fb-radio__input:** O input HTML oculto do tipo radio que mantém a lógica e acessibilidade.

- **.fb-radio__label:** A interface visual clicável que o usuário enxerga.

    - **Modificadores:** `--button` (aplica visual de botão com estados `--active, --is-first` para o botão inicial do grupo, e `--is-last` para o botão final).

## Detalhe de Arquitetura de Layout
Ao utilizar a propriedade button, o mapeamento do `FbRadio` injeta automaticamente as strings de classe `--is-first` e `--is-last` baseando-se no índice da array de opções. Isso permite que o CSS remova com precisão os cantos arredondados internos, fazendo com que o grupo de botões pareça um bloco único segmentado e fluido.

## Backdoor
### Props

| Prop | Tipo | Default | Descrição |
|------|:----:|-------------|-----------|
|id|String|undefined|ID do elemento (usado apenas no modo simples).|
|modelValue|any|undefined|O valor vinculado ao componente (suporta v-model).|
|multiple|Boolean|false|Se true, o componente espera uma lista de opções e manipula uma Array.|
|options|Array|[]|Lista de opções para o modo múltiplo. Formato: [{ label: 'Texto', value: 'valor', disabled: false }].|
|value|any|true|Valor atribuído ao modelValue quando o checkbox único for marcado.|
|unvalue|any|false|Valor atribuído ao modelValue quando o checkbox único for desmarcado.|
|name|String|(required)|Atributo name do input HTML para agrupamento e acessibilidade.|
|state|Boolean\|null|null|Estado de validação do campo: true (válido), false (inválido).|
|inline|Boolean|false|Se true, renderiza as opções lado a lado (modo múltiplo).|
|button|Boolean|false|Transforma o visual do checkbox tradicional em um botão clicável.|
|buttonVariant|String|'primary'|Sufixo de classe CSS para estilização do botão (ex: primary, danger).|
|switch|Boolean|false|Transforma o visual do checkbox tradicional em uma chave liga/desliga (Switch).|