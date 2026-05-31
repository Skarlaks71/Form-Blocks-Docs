# parseLimitProps
Converte uma lista de campos em uma estrutura compatível com o Form Blocks, gerando automaticamente as propriedades `model` e `back` utilizadas pelo framework. A função também permite limitar ou selecionar intervalos específicos dos itens processados.

## Função
::: details Ver Função
```js
const parseLimitProps = (stringsArray, limitOrRange = [0, stringsArray.length]) => {
    const toCamelCase = (str) => {
      return str
        .replace(/[-_ ](.)/g, (_, char) => char.toUpperCase()) // Converte traços, underscores e espaços para camelCase
        .replace(/^(.)/, (match) => match.toLowerCase()); // Garante que o primeiro caractere seja minúsculo
    };

    let start = 0, end = stringsArray.length;

    // Se for um número, define como limite máximo
    if (typeof limitOrRange === "number") {
      end = Math.min(limitOrRange, stringsArray.length);
    }
    // Se for um array [start, end]
    else if (Array.isArray(limitOrRange) && limitOrRange.length === 2) {
      [start, end] = limitOrRange;
      end = Math.min(end, stringsArray.length); // Evita ultrapassar o tamanho
    }

    return stringsArray.slice(start, end).flatMap(item => {
      if (Array.isArray(item) && item.length > 2) {
        const [groupName, _, ...values] = item
        return values.map(str => ({ model: toCamelCase(str), back: `${groupName}.${str}` }));
      } else if (typeof item === "string") {
        return { model: toCamelCase(item), back: item };
      }
      return [];
    });
}
```
:::

## Parametros
### stringsArray
Array contendo os nomes dos campos que serão convertidos para o formato utilizado internamente pelo Form Blocks.

O array aceita dois formatos:

#### Campos Simples
```js
[
  'first_name',
  'last_name',
  'email'
]
```

#### Campos Agrupados
```js
[
  ['contacts', null, 'type', 'value']
]
```
Neste caso, o primeiro elemento representa o grupo e os valores subsequentes representam os campos pertencentes a ele.

### limitOrRange (Opicional)
Define quais elementos de stringsArray serão processados.

Pode receber:
#### Número
Limita a quantidade máxima de itens processados a partir do início do array.

```js
parseLimitProps(fields, 3)

// equivalente a:

fields.slice(0, 3)
```

#### Intervalo
Um array contendo a posição inicial e final.

```js
parseLimitProps(fields, [2, 5])

// equivalente a:

fields.slice(2, 5)
```

   > O segundo valor segue o comportamento padrão do `Array.slice()`, sendo exclusivo.

Caso nenhum valor seja informado, todos os itens serão processados.

## Retorno
Retorna um array de objetos contendo as propriedades utilizadas pelo Form Blocks para vincular os campos ao estado do formulário.

## Exemplos

### Exemplo de Entrada

```js
[
  'first_name',
  'email'
]
```

### Saída

```js
[
  {
    model: 'firstName',
    back: 'first_name'
  },
  {
    model: 'email',
    back: 'email'
  }
]
```

### Exemplo de entrada com Grupo

```js
[
  ['contacts', Array, 'type', 'value']
]
```

### Saída

```js
[
  {
    model: 'type',
    back: 'contacts.type'
  },
  {
    model: 'value',
    back: 'contacts.value'
  }
]
```
