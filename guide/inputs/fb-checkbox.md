# O Componente: FbCheckbox
O `<fb-checkbox>` estende a funcionalidade do elemento nativo de seleção, permitindo o gerenciamento de estados booleanos únicos, listas de opções múltiplas, além de variantes visuais como botões agrupados e chaves do tipo _Switch_.

## Funcionalidades
- **Modo Único ou Múltiplo:** Alterna entre gerenciar um valor primitivo único (ou booleano) ou alimentar uma estrutura de `Array` quando `multiple` está ativo.

- **Valores Customizados:** Permite definir quais valores literais devem ser associados ao estado checado (`value`) e não checado (`unvalue`).

- **Variantes de Estilo:** Suporta estilização nativa para se comportar visualmente como um grupo de botões ou como um componente de _Switch_.

- **Alinhamento Flexível:** Permite organizar as opções verticalmente ou lado a lado de forma simples (`inline`).

## Como usar
1. **Checkbox Único (Booleano / Termos de Uso)**
   
O cenário clássico para aceites. Por padrão, ele emite true ou false.

```vue
<fb-checkbox 
  v-model="termos" 
  name="termos_uso"
/>
```

2. **Checkbox Único com Valores Customizados**
   
Se a sua API não espera um booleano, você pode customizar o retorno mapeando `value e unvalue`:

```vue
<fb-checkbox 
  v-model="notificar" 
  name="marketing"
  value="sim"
  unvalue="nao"
/>
```

3. **Múltiplas Opções (Grupo de Seleção)**
   
Para coletar uma lista de respostas do usuário em formato de array, ative o `multiple` e passe a propriedade `options`:

```html
<script setup>
const hobbies = ref([]) // Inicializa como array
const listaHobbies = [
  { label: 'Futebol ⚽', value: 'futebol' },
  { label: 'Videogames 🎮', value: 'games' },
  { label: 'Leitura 📚', value: 'leitura', disabled: true }
]
</script>

<template>
  <fb-checkbox 
    v-model="hobbies" 
    name="meus_hobbies"
    multiple
    inline
    :options="listaHobbies"
  />
</template>
```

4. **Variante Switch**
   
Para criar seletores modernos do tipo "Liga/Desliga", basta adicionar a flag `switch`:

```vue
<fb-checkbox 
  v-model="darkMode" 
  name="theme_mode"
  switch
/>
```

5. **Variante Botão (Button Group)**
   
Perfeito para substituir elementos de seleção sem estragar o design da interface:

```vue
<fb-checkbox 
  v-model="filtros" 
  name="categorias"
  multiple
  button
  button-variant="success"
  :options="[
    { label: 'Novos', value: 'new' },
    { label: 'Usados', value: 'used' }
  ]"
/>
```

## Classes e Customização CSS
O `FbCheckbox` gera estruturas limpas utilizando a metodologia BEM baseada no prefixo configurado:

- **.fb-checkbox-group:** O container que envolve múltiplos checkboxes.

    - **Modificadores:** `--inline` (lado a lado) ou `--vertical` (em lista).

- **.fb-checkbox:** O container individual de cada opção.

- **.fb-checkbox__input:** O input invisível do tipo `checkbox` que cuida da lógica do clique.

- **.fb-checkbox__label:** A label visível do componente.

    - **Modificadores:** `--button` (com modificadores de estado `--active, --is-first, --is-last` para agrupamento perfeito de cantos arredondados) ou `--switch`.

## Inicialização Segura
No método setup, o componente valida o estado inicial da propriedade `modelValue`. Se ele for omitido (`undefined`), o framework define automaticamente o valor padrão correto em tempo de execução: uma `Array` vazia `[]` se `multiple` for verdadeiro, ou o conteúdo de `unvalue` caso seja um seletor único. Isso previne erros de referências nulas e estados inconsistentes de renderização.

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