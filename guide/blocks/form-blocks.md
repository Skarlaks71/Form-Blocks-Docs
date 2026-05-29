# O Componente: FormBlocks
O componente `<form-blocks>` é o ponto de entrada único para renderizar seus formulários. Ele é responsável por gerenciar a reatividade global, injetar erros de validação e fornecer slots de customização para cada nível da hierarquia.

## Anatomia
Formulários em geral são criados a partir de seções de inputs:
```html
<div>
  <div class="section 1">
    <div class="form-group">
      <label>Input 1</label>
      <input type="text" />
    </div>
    <div class="form-group">
      <label>Input 1</label>
      <input type="text" />
    </div>
    ... <!-- outros N inputs -->
  </div>
  <div class="section 2">
    <div class="form-group">
      <label>Input 1</label>
      <input type="text" />
    </div>
    <div class="form-group">
      <label>Input 1</label>
      <input type="text" />
    </div>
    ... 
  </div>
  ... <!-- outras N seções -->
</div>
```

no FormBlocks chamos essas seções de **groups** `<form-blocks :groups="myGroups" />`, além dos grupos os formulários também precisam de variaveis para receber os valores dos inputs que foram passados pelos usuários, quem faz a captação e armazenamento dessas variaveis é o objeto formData, por ser o coração de um formulário ele é o nosso v-model `<form-blocks v-model="formData" />`

::: warning Dica
Recomendo criar o formData como um objeto vazio `const formData = ref({})`, pois isso facilita no desenvolvimento de telas **Change** (**_Novo/Editar_**) ou apenas em telas de **Edição** (**_Editar_**). Porque as propriedades do objeto **formData** só são criadas no momento que o usuário digita naquele campo pela primeira vez.
:::

Por fim, formulários possuem também um terceiro elemento chave que são os erros `<form-blocks :errors="errors" />`, que também é representado aqui por um objeto de **errors** assim como o **formData**.

Com isso temos o nosso componente criado e pronto:
```vue
<form-blocks
  v-model="formData"
  :groups="groups"
  :errors="errors"
/>
```

## Sistema de Slots (Customização Extrema)
O coração da flexibilidade do Form Blocks reside no seu sistema de slots dinâmicos. Você pode interceptar a renderização em três níveis: **Grupo**, **Input** e **Repetidor**.

### 1. Slot de Grupo: group(key)
Permite substituir a renderização de um bloco inteiro de campos.

```vue
<form-blocks v-model="formData" :groups="groups">
  <!-- Onde '0' é o índice do grupo ou a chave definida no groupBase -->
  <template #group(0)="{ group }">
    <div class="meu-layout-customizado">
      <h4>{{ group.title }}</h4>
      <!-- Renderize o que quiser aqui -->
    </div>
  </template>
</form-blocks>
```

### 2. Slot de Input: input(key)
Permite substituir um campo específico preservando o restante do formulário. Muito útil para campos complexos como upload de arquivos ou editores de texto.

```vue
<form-blocks v-model="formData" :groups="groups">
  <template #input(full_name)="{ form }">
    <label>Nome Especial:</label>
    <input v-model="formData.full_name" class="custom-input" />
  </template>
</form-blocks>
```

### 3. Slot de Repetidor: form-repeater
Se você quiser mudar completamente como a interface de "Adicionar/Remover" itens funciona.

```vue
<form-blocks v-model="formData" :groups="groups">
  <template #form-repeater="{ form, groupModel }">
    <!-- Sua lógica customizada de loop para campos repetíveis -->
  </template>
</form-blocks>
```

## Groups
Os Groups no FormBlocks são sem duvidas a parte mais importante do componente, pois sem eles a mágica não acontece, por isso temos essa seção inteira dedicada a explicar como criar groups, onde vivem e o que comem.

### Criando um groupBase
Grupos são objetos de configuração usados para criar seus formulários da forma mais personalizada possivel, neles você irá ter propriedades pra fazer praticamente tudo que estiver pensando para o layout do seu formulário, até mesmo os mais complexos e exóticos. Para criarmos um group primeiro precisamos da base ou **_groupBase_**, e como todo arquivo de configuração sempre irá ser relativamente grande, recomendo criar um arquivo externo (_**uma composable**_) para isso.

```javascript
// useLoginForm.js
export default const useLoginForm = () => {
  const groupBase = [
    {
      title: 'Meu Formulário',
      forms: [
        {
          label: 'Digite seu e-mail',
          iProps: {
            type: 'email',
            placeholder: 'voce@seuemail.com',
            required: true,
          },
        },
        {
          label: 'Digite sua senha',
          iProps: {
            type: 'password',
            placeholder: '******',
            required: true,
          },
        }
      ]
    }
  ]

  return {
    groupBase,
  }
}
```

### Criando as backVars
O FormBlocks foi idealizado para um sistema monolito _**Laravel + Inertia + Vue**_, por esse motivo as variaveis do backend tem forte influência sobre as variaveis do front, mas isso não é um problema para outros sistemas, principalmente **Rest Api**.

As **backVars** são sempre o **NOME** das variaveis/propriedades do objeto que vai pro banco ou que vem dele, elas devem ser **um `Array` formado pelos NOMES** dessas propriedades, e são criadas ou como um prop `Array` em caso de **Monolito** ou como um `Array` de modo geral, assim:

```vue
<script setup>
// como prop ideal para Monolitos
const props = definePops({
  backVars: {
    type: Array,
    default: () => [
      'email',
      'password',
      'confirm_password',
    ]
  }
})

// como array tradicional
// usado para todos os tipos de sistemas
// principalmente se você possuir mais de um formulário na página
const backVars = [
  'email',
  'password',
  'confirm_password',
]
</script>
```

como deu pra notar algumas variaveis estão escritas em _**snake_case**_ isso é proposital, pois no laravel geralmente usamos dessa forma, como FormBlocks tem influência direto do laravel nesse aspecto, as backVars por padrão devem ser definidas nesse formato pois **TODAS** as backVars vão ser transformadas automaticamente em **models** quando os **groups** forem criados.

::: danger NOTA
As backVars são automaticamente transformadas em **Model** via função parse interna. Essa função pode e deve ser substituida caso seu backend não utilize _**snake_case**_!
:::

### Criando um Group
Agora que temos nossa base precisamos importar nosso **FormHandle**, assim:

```html
<script setup>
import { useFormHandle } from '@form-blocks/core'

// resto do codigo
</script>
```

ele é quem irá criar nossos groups através da nossa base, das nossas backVars e de uma função parse caso queiramos (essa função é opcional). Para isso usamos a função `makeGroups` que recebe de 3 - 4 argumentos, **backVars**, **groupBase** e o **groupProps**, além desses 3 existe um quarto argumento chamado options usado para passar a sua função parse se necessário.

```vue
<script setup>
import { useFormHandle } from '@form-blocks/core'
import useLoginForm from './composables/useLoginForm'

const backVars = ['email', 'password']

// 2. Estado do formulário e erros
const formData = ref({})
const errors = ref({})

// 3. Construção dos blocos
const { groupBase } = useLoginForm()
const { makeGroups } = useFormHandle()
const groups = makeGroups(backVars, groupBase, [2]) // [!code highlight]
</script>
```

## Exposição de Métodos (expose)
Se você precisar acessar o estado interno via `ref` no componente pai:

```javascript
const formRef = ref(null)

// Acessando os dados atuais
console.log(formRef.value.formData)
```

```vue
<form-blocks ref="formRef" v-model="formData" :groups="groups" />
```

## Dica de Performance
Sempre defina suas `backVars e groupBase` fora do ciclo de renderização ou utilize `computed` para evitar que o `makeGroups` seja reexecutado desnecessariamente, o que causaria a remontagem dos componentes de input.

## Backdoor
### Props

| Prop | Tipo | Obrigatório | Descrição |
|------|:----:|-------------|-----------|
| v-model (FormData) | Object | Sim | O objeto de estado do formulário (ex: formData). |
| groups | Array | Sim | O array de grupos processado pelo makeGroups. |
| errors | Object | Não | Objeto contendo mensagens de erro mapeadas pelas chaves do model. |

### Props (Groups)

| Prop | Tipo | Padrão | Descrição |
|------|:----:|-------------|-----------|
| title | String | '' | Titulo do grupo do formulário |
| noTitle | Boolean | false | Retira o titulo daquele grupo |
| dependent | Boolean | undefined | Usada para controlar a visibilidade ou ausência de um grupo |
| isRepeater | Boolean | false | Usada para transformar um grupo em um repeater |
| repeaterProps | Object | {} | São as propriedades do **FormBlocksRepeater** |
| forms | Array | [] | Os formulários do grupo |
| groupModel | String | undefined | Nome do model usado para armazenar o grupo quando o grupo for um repeater. **É obrigatório** sempre que `isRepeater: true` |
| groupFormData | Object | undefined | Objeto usado para armazenar os valores default do repeater. **É obrigatório** sempre que `isRepeater: true` |
| groupFormData | Object | undefined | Objeto usado para armazenar os valores default do repeater. **É obrigatório** sempre que `isRepeater: true` |
| key | String\|Number | undefined | Chave de referência do grupo, usada para customização de slots de grupo. |

### Props (Groups.forms)

| Prop | Tipo | Padrão | Descrição |
|------|:----:|-------------|-----------|
| formKey | String\|Number | undefined | Chave de referência do form, usada para customização de slots do form (_**label + input**_) no grupo. |
| label | String | '' | Label do form |
| dependent | Boolean | undefined | Usada para controlar a visibilidade ou ausência de um form |
| form | Object | {} | Um unico bloco de form (_**label + input**_) do grupo |
| component | String | 'input' | Nome de registro do componente de input a ser renderizado. Deve ser um componente nativo do FormBlocks ou um registrado através da função `registerComponent` |
| colProps | Object | {} | São as propriedades do **FbCol** |
| iProps | Object | {} | São as propriedades e atributos do input que será redirizado via _`component`_ |
| inputBlockProps | Object | {} | São as propriedades do **FbInputBlock** |
|labelFor|Boolean\|String|false|Atributo `for` do `<label>` do form. Se false, o componente renderiza um `<span>` em vez de um `<label>` para evitar quebra de foco semântico em múltiplos seletores.|
| model | String | undefined (auto) | String criada **automaticamente** a partir da backVar correspondente ao form, via `parseLimitProps` na criação do grupo. Essa string representa o nome do `v-model` desse form, que será atribuido ao `formData` |
| back | String | undefined (auto) | String criada **automaticamente** a partir da backVar correspondente ao form, via `parseLimitProps` na criação do grupo. Essa string tem exatamente o mesmo nome da backVar, que será atribuido ao objeto `errors`|
| events | Object | {} | São os eventos do input que será redirizado via _`component`_ |
