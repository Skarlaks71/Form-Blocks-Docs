#  O Componente: FormInputsBlocks

O `<form-inputs-blocks>` é o componente atômico do framework. Sua principal função é receber a configuração de um único campo e renderizar o componente correspondente, injetando as propriedades de estado, erros e atributos de design.

## Responsabilidades
1. **Resolução de Componente:** Identifica qual componente de UI deve ser renderizado (Baseado na propriedade component do registro).

2. **Vínculo de Dados (Two-Way Binding):** Gerencia o `v-model` entre o objeto global formData e o input específico.

3. **Gestão de Erros:** Conecta as mensagens de erro vindas do provedor global diretamente ao feedback visual do campo.

4. **Encapsulamento de Layout:** Renderiza o campo dentro de um `FbInputBlock` (que contém o Label, Helper Text e mensagens de erro).

## Funcionamento Interno
### Provedores e Injeção
Este componente não recebe o `formData` via props. Ele utiliza o inject para acessar o estado global fornecido pelo `FormBlocks` raiz. Isso garante que, não importa quão profundo o input esteja na árvore de componentes (como dentro de um repetidor), ele sempre terá acesso aos dados.

### A função createInputNode
O componente utiliza uma função auxiliar de renderização que:

- Verifica se o componente está registrado no Registry.

- Repassa todas as iProps (propriedades de input) definidas na DSL ou no objeto.

- Configura os eventos de atualização (`update:modelValue`) para sincronizar com o estado global.

### Exemplo de Fluxo de Dados
Quando você define `'Email::email:md6'`, o `FormInputsBlocks`:

1. Recebe o objeto processado.

2. Identifica que o componente é um input comum com `type: email`.

3. Busca no `formData` a chave correspondente ao model (nome em camelCase derivado da backVars, ex: `backVars: { my_var } -> form.model = myVar`).

4. Renderiza o componente de UI com as colunas responsivas aplicadas.

## Customização via Slots
Embora o FormInputsBlocks tenha uma renderização padrão, ele permite a interceptação através de slots definidos no pai:

```vue
<form-blocks v-model="formData" :groups="groups">
  <!-- Customizando apenas o "miolo" do input, mantendo o Label e o Grid -->
  <template #input(minha_chave)="{ form }">
    <my-custom-date-picker v-model="formData[form.model]" />
  </template>
</form-blocks>
```

## Registro de Componentes (Registry)
O `FormInputsBlocks` depende de um registro global para saber o que renderizar. Por padrão, ele já vem configurado para:

- **Input Padrão:** Texto, senhas, números.

- **Select:** Usando o `vue-select`.

- **Flatpickr:** Para todos os tipos de data e hora.

- **Checkboxes e Radios.**

## Dica de Performance
O componente utiliza `toRef` para manter a reatividade do `formData`. Isso evita que o formulário inteiro sofra re-render sempre que um único caractere é digitado, focando a atualização apenas no componente que está sendo editado.

## Backdoor
### Props

| Prop | Tipo | Default | Descrição |
|------|:----:|-------------|-----------|
| input|Object| (required) | O objeto de configuração do campo (gerado pelo core). |
| inputKey|Number/String| 0 | A posição ou chave única do input no grupo. |