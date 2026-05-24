# O Componente: FormBlocks
O componente `<form-blocks>` é o ponto de entrada único para renderizar seus formulários. Ele é responsável por gerenciar a reatividade global, injetar erros de validação e fornecer slots de customização para cada nível da hierarquia.

## Sistema de Slots (Customização Extrema)
O coração da flexibilidade do Form Blocks reside no seu sistema de slots dinâmicos. Você pode interceptar a renderização em três níveis: **Grupo**, **Input** e **Repetidor**.

1. **Slot de Grupo: group(key)**
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

2. **Slot de Input: input(key)**
Permite substituir um campo específico preservando o restante do formulário. Muito útil para campos complexos como upload de arquivos ou editores de texto.

```vue
<form-blocks v-model="formData" :groups="groups">
  <template #input(full_name)="{ form }">
    <label>Nome Especial:</label>
    <input v-model="formData.full_name" class="custom-input" />
  </template>
</form-blocks>
```

3. **Slot de Repetidor: form-repeater**
Se você quiser mudar completamente como a interface de "Adicionar/Remover" itens funciona.

```vue
<form-blocks v-model="formData" :groups="groups">
  <template #form-repeater="{ form, groupModel }">
    <!-- Sua lógica customizada de loop para campos repetíveis -->
  </template>
</form-blocks>
```

## Funcionamento Interno
Para garantir que o framework seja performático e fácil de usar, ele utiliza tecnologias nativas do Vue 3:

### Injeção de Dependência (Provide/Inject)
O componente raiz fornece o `formData` e o objeto `errors` para todos os componentes filhos (Inputs, Repeaters, Rows). Isso significa que você nunca precisa passar props manualmente de nível em nível.

### Renderização Funcional (h())
Como você viu no código fonte, utilizamos a **Render Function** para garantir que a renderização seja extremamente leve, permitindo que o framework decida dinamicamente se deve renderizar um `FbInput` comum ou um `flatpickr` baseado na sua DSL.

### Ciclo de Vida no Repetidor
O componente `FormBlocksRepeater` é inteligente:

1. **Auto-init:** Se o array do model estiver vazio, ele adiciona automaticamente o primeiro item no onMounted.

2. **Soft-delete:** Se um item já existe no banco (possui um type ou id), ao remover, ele marca como deleted: true em vez de remover do array, facilitando a sincronização com o backend.

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