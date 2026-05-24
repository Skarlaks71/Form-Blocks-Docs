# The Component: FbInput
The `<fb-input>` is a smart wrapper over the native HTML `<input>` tag. It integrates seamlessly with the **Form Blocks** ecosystem, providing built-in support for masks, character counting, dynamic formatting, and visual validation states.

## Features
- **Automatic Inheritance:** Any native HTML attribute `(such as type="password", placeholder, disabled or maxlength)` passed to the component is forwarded directly to the internal input.

- **Dynamic Directives:** Applies the `v-maska` and `v-limit-chars` directives at runtime only if the respective properties are declared.

- **Formatter Processing:** Allows intercepting the typed value and modifying it (e.g.: force uppercase) before updating the form state.

## How to Use
### Basic Usage (with inherited native attributes)
You can use it by passing native types and placeholders directly:

```vue
<fb-input 
  v-model="email" 
  type="email" 
  placeholder="your@email.com" 
/>
```

### Applying Masks (mask)
If your project's core has the `v-maska` directive registered globally, you can inject masks directly:

```vue
<fb-input 
  v-model="phone" 
  mask="'(##) #####-####'" 
  placeholder="(00) 00000-0000" 
/>
```

### Formatting Input in Real Time (formatter)
Useful for scenarios where the entered data needs to follow a strict visual rule (such as transforming text to uppercase):

```html
<script setup>
const upperCaseFormatter = (value) => value.toUpperCase()
</script>

<template>
  <fb-input 
    v-model="licensePlate" 
    :formatter="upperCaseFormatter" 
    placeholder="ABC1D23" 
  />
</template>
```

### Validation States
The component applies BEM modifiers to the control class based on the error feedback:

```vue
<fb-input v-model="password" :state="false" type="password" />

<fb-input v-model="username" :state="true" />
```

## CSS and BEM Structure
The component generates classes based on the global prefix (default: fb):

- **.fb-input-block__control**: The default class applied to the `<input>` element.

- **.fb-input-block__control--valid**: Applied when `:state="true"`. Usually displays a green border or success icon.

- **.fb-input-block__control--invalid**: Applied when `:state="false"`. Usually displays a red border indicating the validation error.

## Implementation Details (Accessibility)
If you don't pass an id via attributes, the component automatically generates a stable random ID `(e.g.: fb-input-a1b2c3d)`. This ensures that when the FbInputBlock renders the `<label>`, the `for=""` attribute is perfectly bound to the input, respecting **accessibility (WAI-ARIA)** best practices.

## Backdoor
### Props

| Prop | Type | Default | Description |
|------|:----:|---------|-------------|
| modelValue | String\|Number | '' | The value bound to the field (supports v-model). |
| formatter | Function | undefined | Function executed on the input event to format the typed value. |
| state | Boolean\|null | null | Controls the validation classes: true (valid), false (invalid) or null (neutral). |
| mask | String\|Object | null | Mask configuration using the Maska library. |
| limit | Number\|String | null | Visual or logical character limit for the custom directive. |
