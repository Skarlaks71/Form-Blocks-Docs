# The Component: FbRadio
The `<fb-radio>` manages the rendering of exclusive selection groups (Radio Button type). It encapsulates the native input tags, ensuring correct grouping through the `name` attribute, while also offering support for responsive layouts and styled button variants.

## Features
- **Native Exclusive Selection:** Enforces the correct browser behavior by requiring and managing the mandatory `name` property.

- **Integrated Button Mode:** Replaces the classic radio circle with chained button blocks with automatic border control (`--is-first` and `--is-last`).

- **On-Demand Alignment:** Easily toggles between list display (_vertical_) or side by side (_inline_).

- **Validation States:** Passes validation classes and disables options individually through the configuration array.

## How to Use
1. **Traditional Usage (Vertical List)**

Ideal for common structured questionnaires.

```html
<script setup>
const gender = ref(null)
const genderList = [
  { label: 'Male', value: 'M' },
  { label: 'Female', value: 'F' },
  { label: 'Prefer not to say', value: 'N' }
]
</script>

<template>
  <fb-radio 
    v-model="gender" 
    name="user_gender"
    :options="genderList"
  />
</template>
```

2. **Horizontal Layout (inline)**

Ideal for short Yes or No questions that save vertical screen space.

```vue
<fb-radio 
  v-model="acceptTerms" 
  name="accept_terms"
  inline
  :options="[
    { label: 'Yes', value: true },
    { label: 'No', value: false }
  ]"
/>
```

3. **Segmented Button Variant (button)**

A modern alternative to traditional select boxes, widely used for quick plan or size choices:

```vue
<fb-radio 
  v-model="shirtSize" 
  name="product_size"
  button
  button-variant="outline-secondary"
  :options="[
    { label: 'S', value: 's' },
    { label: 'M', value: 'm' },
    { label: 'L', value: 'l', disabled: true },
    { label: 'XL', value: 'xl' }
  ]"
/>
```

## CSS Classes and BEM Structure
Following the framework's architectural style pattern:

- **.fb-radio-group:** The main group container.

    - **Modifiers:** `--stacked` (vertical list) or `--inline` (side by side).

- **.fb-radio:** The isolated container that wraps each option (`input + label`).

- **.fb-radio__input:** The hidden HTML radio input that maintains logic and accessibility.

- **.fb-radio__label:** The clickable visual interface that the user sees.

    - **Modifiers:** `--button` (applies button styling with states `--active, --is-first` for the first button in the group, and `--is-last` for the last button).

## Layout Architecture Detail
When using the `button` property, the `FbRadio` mapping automatically injects the `--is-first` and `--is-last` class strings based on the options array index. This allows the CSS to precisely remove the internal rounded corners, making the button group appear as a single segmented and fluid block.

## Backdoor
### Props

| Prop | Type | Default | Description |
|------|:----:|---------|-------------|
| id | String | undefined | Element ID (used only in simple mode). |
| modelValue | any | undefined | The value bound to the component (supports v-model). |
| multiple | Boolean | false | If true, the component expects a list of options and manipulates an Array. |
| options | Array | [] | List of options for multiple mode. Format: [{ label: 'Text', value: 'value', disabled: false }]. |
| value | any | true | Value assigned to modelValue when the single checkbox is checked. |
| unvalue | any | false | Value assigned to modelValue when the single checkbox is unchecked. |
| name | String | (required) | The HTML input name attribute for grouping and accessibility. |
| state | Boolean\|null | null | Field validation state: true (valid), false (invalid). |
| inline | Boolean | false | If true, renders options side by side (multiple mode). |
| button | Boolean | false | Transforms the traditional checkbox visual into a clickable button. |
| buttonVariant | String | 'primary' | CSS class suffix for button styling (e.g.: primary, danger). |
| switch | Boolean | false | Transforms the traditional checkbox visual into an On/Off toggle (Switch). |
