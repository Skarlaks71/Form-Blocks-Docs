# makeGroups

A `makeGroups` centraliza o fluxo de preparação do formulário em três etapas automáticas: ela normaliza o groupBase convertendo atalhos de texto (_**DSL**_) em objetos válidos de input, injeta propriedades customizadas nos campos (como listas de opções para _**selects/checkbox/radios**_) e executa o mapeamento das variáveis do backend. É a função principal que você utiliza para transformar definições abstratas em um grupo de componentes totalmente configurado.

## A Função
::: details Ver Função
```javascript
const makeGroups = (backVars, groupBase, groupProps, options = {}) => {

    const parseFunction = options.parse || parseLimitProps

    const normalizedGroups = groupBase.map(group => ({
      ...group,
      forms: group.forms.map(input => {
        // Se for string, vira objeto com label
        if (typeof input === 'string') {
          return parseStringShorthand(input)
        }
        if (Array.isArray(input)) {
          if (typeof input[0] !== 'string') {
            throw new Error('FB 001: The first element needs to be String!')
          }

          const parse = parseStringShorthand(input[0])
          parse.iProps = { ...parse.iProps, options: input[1] }
          return parse
        }
        return input
      })
    }))

    createInternalProps(normalizedGroups, backVars, groupProps, parseFunction)

    return normalizedGroups
}
```
:::

## Parametros
### backVars
Array de string com os nomes dos campos do model do banco de dados que o frontend irá receber e enviar para o backend. Essas strings devem ser criadas em **_snake_case_**, caso seu backend ultilize outra nomenclatura deve obrigatóriamente ser passado uma **_parseFunction_** customizada. Essas strings serão automaticamente convertidas para model via parseFunction padrão (**parseLimitProps**) e atribuidas ao formData.

### groupBase
Array de definição com os objetos de configuração dos grupos, form e repeaters, do formulário a ser criado.

### groupProps
Array de definição usado para conectar as backVars aos inputs dos grupos correspondentes.
```vue
<script setup>
const backVars = ['full_name', 'email', 'password']

const { groupBase } = useRegisterForm()
const groups = makeGroups(groupBase, backVars, [3]) // groupProps é um array com o número de variaveis que aquele grupo possui.
</script>
```

::: warning Importante
Para cada input de um grupo deve-se ter um backVar correspondente a ele, logo se você possui um unico grupo com 5 inputs, deve ter 5 backVar e passar `groupProps = [5]`.
:::

caso você possuia mais de um grupo em seu formulário as você terá a liberdade de escolher como fazer a associação da forma que melhor se encaixa aos seus grupos

```vue
<script setup>
const backVars = [
    'full_name',
    'email',
    'password',
    'zipcode',
    'street',
    'number',
    'complement',
]

const { groupBase } = useRegisterForm()
const groups = makeGroups(groupBase, backVars, [3, [3, 7]])
</script>
```

#### Explicação da sintax limitOrRange: [3, [3, 7]]
O groupProps olha para o primeiro elemento do Array e verifica se ele é um número ou array, se ele for só um número então significa que ele é um **limit**, ou seja devem ser selecionados todos os itens até aquela posição, logo para aquela backVars serão os itens: `'full_name', 'email' e 'password'`, que são os 3 primeiros itens. 

Em seguida a groupProps passa para o próximo elemento que é um Array, então nesse caso é um **Range** de `[start, end(exclusivo)]`, como estamos falando de array sabemos que o primeiro **indice é o 0**, então se nossa backVars tem 7 itens e definimos o `start = 3 ([3, 7])`, então nosso **Range** começa no `'zipcode'` e termina no `'complement'`, mas porque no `'complement'` se ele é o sexto indice do array? Porque o **end** do nosso **Range** é **exclusivo**, isso significa que ele só vai até o antecessor (**_end - 1_**), nesse caso o sexto indice já que nosso `end = 7 ([3, 7])`

### options (Opcional)
É um objeto de definição usado exclusivamente para passar a função parse de sua preferência para a função `createInternalProps`

Função parse que substitui o parse usado na função parseLimitProps na conversão das strings backVars de **_snake_case_** para **_camelCase_**

## Retorno
Retorna um Array normalizado dos grupos já com todas as variaveis model e back atribuidas aos seus respectivos inputs.

## Erros
Caso algum form de um dos grupos esteja escrito no modo dsl na sintax de array (**[string, options]**) e o primeiro elemento não for uma string o sistema irá travar lançando o erro:
```js
FB 001: The first element needs to be String! // [!code error]
```