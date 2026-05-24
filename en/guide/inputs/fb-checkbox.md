# The Component: FbCheckbox
The `<fb-checkbox>` extends the functionality of the native selection element, allowing the management of single boolean states, multiple-option lists, and visual variants such as grouped buttons and Switch-type toggles.

## Features
- **Single or Multiple Mode:** Toggles between managing a single primitive (or boolean) value or feeding an `Array` structure when `multiple` is active.

- **Custom Values:** Allows defining which literal values should be associated with the checked (`value`) and unchecked (`unvalue`) states.

- **Style Variants:** Supports native styling to visually behave as a button group or as a Switch component.

- **Flexible Alignment:** Allows organizing options vertically or side by side in a simple way (`inline`).

## How to Use
1. **Single Checkbox (Boolean / Terms of Service)**

The classic scenario for acceptances. By default, it emits true or false.

```vue
<fb-checkbox 
  v-model="terms" 
  name="terms_of_use"
/>
```

2. **Single Checkbox with Custom Values**

If your API doesn't expect a boolean, you can customize the return by mapping `value` and `unvalue`:

```vue
<fb-checkbox 
  v-model="notify" 
  name="marketing"
  value="yes"
  unvalue="no"
/>
```

3. **Multiple Options (Selection Group)**

To collect a list of user responses in array format, enable `multiple` and pass the `options` property:

```html
<script setup>
const hobbies = ref([]) // Initialize as array
const hobbyList = [
  { label: 'Soccer ⚽', value: 'soccer' },
  { label: 'Videogames 🎮', value: 'games' },
  { label: 'Reading 📚', value: 'reading', disabled: true }
]
</script>

<template>
  <fb-checkbox 
    v-model="hobbies" 
    name="my_hobbies"
    multiple
    inline
    :options="hobbyList"
  />
</template>
```

4. **Switch Variant**

To create modern "On/Off" toggles, simply add the `switch` flag:

```vue
<fb-checkbox 
  v-model="darkMode" 
  name="theme_mode"
  switch
/>
```

5. **Button Variant (Button Group)**

Perfect for replacing selection elements without breaking the interface design:

```vue
<fb-checkbox 
  v-model="filters" 
  name="categories"
  multiple
  button
  button-variant="success"
  :options="[
    { label: 'New', value: 'new' },
    { label: 'Used', value: 'used' }
  ]"
/>
```

## CSS Classes and Customization
The `FbCheckbox` generates clean structures using the BEM methodology based on the configured prefix:

- **.fb-checkbox-group:** The container that wraps multiple checkboxes.

    - **Modifiers:** `--inline` (side by side) or `--vertical` (as a list).

- **.fb-checkbox:** The individual container for each option.

- **.fb-checkbox__input:** The invisible `checkbox` input that handles the click logic.

- **.fb-checkbox__label:** The visible label of the component.

    - **Modifiers:** `--button` (with state modifiers `--active, --is-first, --is-last` for perfect rounded corner grouping) or `--switch`.

## Safe Initialization
In the setup method, the component validates the initial state of the `modelValue` property. If it is omitted (`undefined`), the framework automatically sets the correct default value at runtime: an empty `Array` `[]` if `multiple` is true, or the content of `unvalue` if it is a single selector. This prevents null reference errors and inconsistent rendering states.

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
| button | Boolean | false | Transforms the traditional checkbox into a clickable button. |
| buttonVariant | String | 'primary' | CSS class suffix for button styling (e.g.: primary, danger). |
| switch | Boolean | false | Transforms the traditional checkbox into an On/Off toggle (Switch). |
