# parseStringShorthand

Converte uma string **DSL** (**_Designed Shorthand Language_**) em um objeto de configuração compatível com o **Form Blocks**.

Esta é a principal função responsável por interpretar os atalhos da **DSL**, identificando tipos de componentes, propriedades, grids responsivos e flags booleanas através do sistema de **Matchers**.

::: tip Observação
A função não possui conhecimento específico sobre componentes, grids ou propriedades.

Toda a inteligência de interpretação é delegada ao sistema de: `DSL_MATCHERS`
:::

## Função
::: details Ver Função
```js
const parseStringShorthand = (inputString) => {
    // 1. Separa o Label do restante da configuração
    const [label, ...configSegments] = inputString.split('::')
    const result = { label }

    if (configSegments.length > 0) {
      // Pega todos os segmentos após o :: (ex: password:6:md4 -> ['password', '6', 'md4'])
      const parts = configSegments[0].split(':')
      
      parts.forEach(part => {
        let matched = false;

        for (const matcher of DSL_MATCHERS) {
          const matchResult = matcher.test(part);
          
          if (matchResult) {
            matcher.apply(result, matchResult);
            matched = true;
            break; // Para no primeiro que encontrar
          }
        }

        // Caso padrão: Se nada capturou e não é vazio, assume que é uma prop booleana true
        // Ex: "Nome::text:disabled"
        if (!matched) {
          result.iProps = { ...result.iProps, [part]: true }
        }
      })
    }

    return result
}
```
:::

## Parametros
### inputString

String formatada utilizando a sintaxe DSL do Form Blocks.

Estrutura básica:

```
'Label::configuração:configuração'
```

Exemplos válidos:
```js
'Nome'

'Senha::password'

'Email::email:md6'

'Idade::number:min=18:max=99'

'Bio::required:disabled'
```

## Retorno
Retorna um objeto contendo a configuração processada do campo.

Dependendo dos segmentos encontrados, a função pode gerar propriedades como:

- label
- component
- iProps
- colProps
- outras propriedades registradas pelos Matchers

### Como Funciona

O parser executa as seguintes etapas:

#### 1. Extração do Label

A string é dividida utilizando `::`.

```
'Email::email:md6'
```

Resultado:

```js
label = 'Email'
```

#### 2. Separação dos Segmentos

Tudo após o `::` é dividido utilizando `:`.

```js
'Email::email:md6:required'
```

Resultado:

```js
[
  'email',
  'md6',
  'required'
]
```

#### 3. Execução dos Matchers

Cada segmento é enviado para a coleção global:

```js
DSL_MATCHERS
```

O primeiro matcher capaz de interpretar o segmento aplica sua lógica ao objeto final.

Exemplos:

|Segmento|Matcher|
| ----------- | ----------- |
|email|InputTypeMatcher|
|md6|GridMatcher|
|min=18|iPropsMatcher|
|disabled|Fallback Boolean|

#### 4. Fallback para Flags Booleanas

Quando nenhum matcher reconhece um segmento, ele é automaticamente tratado como uma propriedade booleana:

```js
'Nome::required'
```

Resultado:

```js
{
  label: 'Nome',
  iProps: {
    required: true
  }
}
```

## Exemplos

### Campo Simples
::: code-group

```js [Entrada]
'Nome'
```

```js [Saída]
{
  label: 'Nome',
}
```

:::

### Campo Password

::: code-group

```js [Entrada]
'Senha::password'
```

```js [Saída]
{
  label: 'Senha',
  iProps: {
    type: 'password'
  }
}
```

:::

### Grid Responsivo

::: code-group

```js [Entrada]
'Nome::md6'
```

```js [Saída]
{
  label: 'Nome',
  colProps: {
    md: '6'
  }
}
```

:::

### Props Dinâmicas
::: code-group

```js [Entrada]
'Idade::number:min=18:max=99'
```

```js [Saída]
{
  label: 'Idade',
  component: 'input',
  iProps: {
    type: 'number',
    min: 18,
    max: 99
  }
}
```

:::

### Flags Booleanas

::: code-group

```js [Entrada]
'Aceito os Termos::required:disabled'
```

```js [Saída]
{
  label: 'Aceito os Termos',
  iProps: {
    required: true,
    disabled: true
  }
}
```

:::