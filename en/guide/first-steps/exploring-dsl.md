<script setup>
import { ref } from 'vue'
import { useFormHandle } from '@form-blocks/core'
import {
  groupBasePassword,
  groupBaseGrid,
  groupBaseIProps,
  groupBaseFlags,
  groupBaseSelect,
  groupBaseRegister,
} from '@theme/composables/useStartExamples.js'

// 1. Chaves que serão enviadas para a API
const backVars = [
  'valor1',
  'valor2',
  'valor3',
  'valor4',
  'valor5',
]

const backVars2 = [
  'valor21',
  'valor22',
  'valor23',
  'valor24',
  'valor25',
  'valor26',
]

// 2. Estado do formulário e erros
const formData = ref({})
const errors = ref({})

// 3. Construção dos blocos
const { makeGroups } = useFormHandle()
const groupsPassword = makeGroups(backVars, groupBasePassword, [1])
const groupsGrid = makeGroups(backVars, groupBaseGrid, [[1, 2]])
const groupsIProps = makeGroups(backVars, groupBaseIProps, [[2, 3]])
const groupsFlags = makeGroups(backVars, groupBaseFlags, [[3, 4]])
const groupsSelect = makeGroups(backVars, groupBaseSelect, [[4, 5]])
const groupsRegister = makeGroups(backVars2, groupBaseRegister, [6])
</script>

# Exploring the DSL (Designed Shorthand Language)

The Form Blocks Designed Shorthand Language (DSL) was created for developers who value speed and readability. With it, you can define the behavior, style, and properties of a form field using just a single formatted string.

## Syntax Anatomy

The basic structure of a DSL string follows this pattern:

`'Label::configuration:segment:segment'`

- **Label:** The text displayed to the user.

- `::` → Required separator between the field name and its configurations.

- `:` → Segment separator (each segment defines a characteristic).

## Available Segments

The DSL automatically processes each segment through Matchers. Here's what you can control:

### 1. Input Types and Components

Form Blocks automatically identifies the field type.

- **Native Types:** `text`, `password`, `email`, `number`, `url`
- **Special Components:** `select`, `checkbox`, `radio`
- **Date Inputs:** `date`, `datetime-local`, `time`  
  (automatically converted into the `flatpickr` component)

**Example:** `'Password::password'` or `'Birth Date::date'`
<sample-box>
  <form-blocks v-model="formData" :groups="groupsPassword" />
  <template #details-content>

```js
const groupBase = [
  {
    noTitle: true,
    forms: [
      'Senha::password' // [!code highlight]
    ]
  }
]
```
  </template>
</sample-box>

### 2. Grid and Responsiveness
Control layout without writing CSS.

**Base Columns (12-column grid):** Simply pass a number (6 = half width).

**Breakpoints:** Use the breakpoint prefix _**(sm, md, lg, xl)**_ followed by the number.

**Exemplo**: `'Nome::12:md6' (100% width on mobile, 50% width on medium screens)`.
<sample-box>
  <form-blocks v-model="formData" :groups="groupsGrid" />
  <template #details-content>

```js
const groupBase = [
  {
    noTitle: true,
    forms: [
      'Nome::12:md6' // [!code highlight]
    ]
  }
]
```
  </template>
</sample-box>

### 3. Key=Value Properties (iProps)
To pass component-specific attributes (_**placeholder, name, min, max, etc.**_), use assignment syntax.

**Exemplo**: `'Idade::number:min=18:max=99'`
<sample-box>
  <form-blocks v-model="formData" :groups="groupsIProps" />
  <template #details-content>

```js
const groupBase = [
  {
    noTitle: true,
    forms: [
      'Idade::number:min=18:max=99' // [!code highlight]
    ]
  }
]
```
  </template>
</sample-box>

### 4. Boolean Properties (Flags)
Any segment that is not recognized as a type or column will be treated as a boolean property with a value of true.

**Exemplo**: `'Bio::disabled:required'`
<sample-box>
  <form-blocks v-model="formData" :groups="groupsFlags" />
  <template #details-content>

```js
const groupBase = [
  {
    noTitle: true,
    forms: [
      'Bio::disabled:required' // [!code highlight]
    ]
  }
]
```
  </template>
</sample-box>

::: danger Important
Up to version **1.0.0-alpha.6**, the Textarea input does not support DSL syntax!
:::

## Primitive Typing (castPrimitive)
When using the `key=value` syntax, all values are treated as strings by default.
To pass other primitive types, use the type suffix with a pipe `|`:
| Suffix | Type | Example | JS Result |
|:------:|------|---------|--------------|
|   s    | String | name=Gilmar\|s | name="Gilmar" |
|   n    | Number | age=30\|n | age="30" (Number)|
|   b    | Boolean | disabled=true\|b | disabled="true" (Boolean) |
|   g    | BigInt | max=999\|g | max="999" (BigInt) |
|   y    | Symbol | ref=myRef\|y | ref="myRef" (Symbol) |
|   u    | undefined | data-type=\|u | (undefined) |
|   N    | Null | form-data=\|N | form-data="" (null)|

## Working with Options (Select, Radio, Checkbox)
For fields that require a list of options (such as select), pass the DSL string as the first element of an array and the options as the second element.


#### Select Example with Options
<sample-box class="mt-1">
  <form-blocks v-model="formData" :groups="groupsSelect" />
  <template #details-content>

```js
const groupBase = [
  {
    noTitle: true,
    forms: [
      [ 'Cidade::select:md6', [ { label: 'Ceará', value: 'CE' }, { label: 'Paraíba', value: 'PB' } ] ] // [!code highlight]
    ]
  }
]
```
  </template>
</sample-box>

## Practical Examples
#### Quick Registration Form

<sample-box class="mt-1">
  <form-blocks v-model="formData" :groups="groupsRegister" />
  <template #details-content>

```js
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
  </template>
</sample-box>

### What Happens Under the Hood?
The string: `'Senha::password:md6:disabled'` is converted by the core into:

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

## Important Rules

1. **Segment Order:** The order of segments after `::` does not matter (ie: `label::md6:password` é o mesmo que `label::password:md6`).

2. **First Element:** In array definitions, the first element must be the DSL string. Otherwise, error FB 001 will be triggered.

3. **Selects:** When using select, Form Blocks automatically injects a default reduce function: `val => val.value`.

4. **Input:** By default, every component is treated as a text input, so you don't need to explicitly define it. If you want another component type, pass the corresponding type instead _(topic 1)_.