# 🧠 Explorando a DSL (Designed Shorthand Language)

A Designed Shorthand Language (DSL) do Form Blocks foi criada para desenvolvedores que valorizam velocidade e legibilidade. Com ela, você define o comportamento, estilo e propriedades de um campo de formulário usando apenas uma string formatada.

## 🔍 Anatomia da Sintaxe
A estrutura básica de uma string DSL segue este padrão:

`'Label::configuracao:segmento:segmento'`

Label: O texto que aparecerá para o usuário.

- **::** - O separador obrigatório entre o nome do campo e as configurações.

- **:**  - O separador de segmentos (cada segmento define uma característica).

## 🛠 Segmentos Disponíveis
A DSL processa cada segmento automaticamente através de Matchers. Veja o que você pode controlar:

### 1. Tipos de Input e Componentes
O Form Blocks identifica automaticamente o tipo de campo.

Tipos Nativos: text, password, email, number, url.

Componentes Especiais: select, checkbox, radio.

Datas: date, datetime-local, time (convertidos automaticamente para o componente flatpickr).

Exemplo: `'Senha::password' ou 'Nascimento::date'`

### 2. Grid e Responsividade
Controle o layout sem escrever CSS.

Colunas Base (12 colunas): Basta passar um número (ex: 6 para ocupar metade da linha).

Breakpoints: Use o prefixo do breakpoint (sm, md, lg, xl) seguido do número.

Exemplo: `'Nome::12:md6' (100% no mobile, 50% em telas médias)`.

### 3. Propriedades Chave=Valor (iProps)
Para passar atributos específicos ao componente (como placeholder, name, min, max), use a sintaxe de atribuição.

Exemplo: `'Idade::number:min=18:max=99'`

### 4. Propriedades Booleanas (Flags)
Qualquer segmento que não for reconhecido como tipo ou coluna será tratado como uma propriedade booleana true.

Exemplo: `'Bio::textarea:disabled:required'`

## 💎 Tipagem Primitiva (castPrimitive)
Ao usar a sintaxe chave=valor, todos os valores são tratados como strings por padrão. Para passar outros tipos primitivos, use o sufixo de tipo com um pipe |:

| Sufixo | Tipo | Exemplo | Resultado JS |
|:------:|------|---------|--------------|
|   s    | String | name=Gilmar\|s | name="Gilmar" |
|   n    | Number | age=30\|n | age="30" (Number)|
|   b    | Boolean | disabled=true\|b | disabled="true" (Boolean) |
|   g    | BigInt | max=999\|g | max="999" (BigInt) |
|   y    | Symbol | ref=myRef\|y | ref="myRef" (Symbol) |
|   u    | undefined | data-type=\|u | (undefined) |
|   N    | Null | form-data=\|N | form-data="" (null)|

## 📦 Trabalhando com Opções (Select, Radio, Checkbox)
Para campos que exigem uma lista de opções (como um select), passamos a string DSL como o primeiro elemento de um array, e as opções como o segundo:

```javascript
// Exemplo de Select com opções
[ 'Cidade::select:md6', [ { label: 'São Paulo', value: 'sp' }, { label: 'Rio', value: 'rj' } ] ]
```

## 🚀 Exemplos Práticos
#### Formulário de Registro Rápido

```javascript
const groupBase = [
  {
    title: 'Cadastro',
    forms: [
      'Nome Completo::text:md8:placeholder=Digite seu nome',
      'Idade::number:md4:min=18',
      'E-mail::email:12',
      'Senha::password:md6',
      'Confirmar Senha::password:md6',
      'Aceito os termos::checkbox:name=terms:required'
    ]
  }
]
```

### O que acontece "por baixo do capô"?
A string 'Senha::password:md6:disabled' é convertida pelo core em:

```javascript
{
  label: "Senha",
  component: "input",
  iProps: {
    type: "password",
    disabled: true,
  },
  colProps: {
    md: "6",
  },
}
```

## ⚠️ Regras Importantes

1. **Ordem dos Segmentos:** A ordem dos segmentos após o :: não importa (ex: md6:password é o mesmo que password:md6).

2. **Primeiro Elemento:** Em definições de array, o primeiro elemento deve ser a string DSL, caso contrário o erro FB 001 será disparado.

3. **Selects:** Ao usar select, o Form Blocks injeta automaticamente um reduce padrão: `val => val.value`.

4. **Input:** Por padrão todos os componentes são input type text então você não precisa passar esse tipo. Caso queira um outro componente passe o tipo correspondente _(tópico 1)_.