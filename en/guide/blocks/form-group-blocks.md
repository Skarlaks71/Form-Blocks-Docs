# The Component: FormGroupBlocks

The `<form-group-blocks>` component is the layout layer that encapsulates a group of fields.

It manages section titles, conditional visibility rules, and switching between standard fields and repeatable fields **(Repeaters)**.

## Responsibilities

1. **Layout:**  
   Organizes inputs inside an `FbRow`.

2. **Dynamic Visibility:**  
   Controls whether the group should be displayed based on the `dependent` prop.

3. **Slot Chaining:**  
   Forwards customization slots from the parent component to child inputs.

4. **Repeater Integration:**  
   Enables dynamic list mode whenever the `isRepeater` flag is present.

---

# Object Structure (`group` Prop)

`FormGroupBlocks` receives a configuration object with the following properties:

| Property | Type | Description |
|-----------|:----:|-------------|
| title | String | The title displayed at the top of the group. |
| noTitle | Boolean | If `true`, hides the title and removes extra spacing. |
| groupModel | String | The key name inside `formData` that will contain the array (example: `'phones'`). |
| groupFormData | Object | The template object for new items (example: `{ number: '', type: 'mobile' }`). |
| isRepeater | Boolean | Transforms the group into a dynamic field list. |
| repeaterProps | Object | Props forwarded directly to the add/remove buttons (`btnAddVariant`, etc). |
| dependent | Boolean | A reactive value that, when `false`, completely unmounts the group. |
| forms | Array | The list of input objects belonging to the group. |

When `isRepeater: true` is detected, rendering is delegated to `FormBlocksRepeater`.

# Conditional Visibility (`dependent`)

One of the most powerful features of `FormGroupBlocks` is its ability to react to form state changes.

```javascript
const { groupBase } = useFormHandle()

// Example:
// The "Company Data" group only appears if 'person_type' is 'PJ'
groupBase[1].dependent = computed(() => formData.value.tipo_pessoa === 'PJ')
```

If `dependent.value` is `false`, the component returns `null`, and no HTML for this group is rendered into the DOM.

## Custom Slots
You can replace the default rendering of a specific group using dynamic slots inside `FormBlocks.vue`.

### Custom Group Slot
```vue
<template #group(nome_do_grupo)="{ group, index }">
  <div class="meu-grupo-com-borda">
    <h3>{{ group.title }}</h3>
    <!-- Manual field rendering if needed -->
  </div>
</template>
```

### Repeater Slot
If you need to replace the visual logic for every repeater in the project:

```vue
<template #form-repeater="{ form, groupModel }">
  <MinhaListaCustomizada :items="formData[groupModel]" />
</template>
```

## Implementation Details
- **Class Prefixing:** The component uses the global PREFIX to ensure styles never conflict with other frameworks. (ie: `fb-group__title`).

- **Animations:** The entire group is wrapped inside a `<Transition>`, component, applying a smooth fade effect whenever the group appears or disappears via `dependent`.

<!-- - **Automatic Spacing:** Grupos subsequentes (com groupKey > 0) recebem automaticamente uma margem superior (`mt-12`) para garantir a hierarquia visual. -->

## Pro Tip: Untitled Groups
Use `noTitle: true` to create purely logical divisions in your code or to organize field grids without adding visual noise to the user interface.

## Backdoor
### Props

| Prop | Type | Default | Description |
|------|:----:|-------------|-----------|
|group |Object| {} | Object used to configure the current form group. |
| groupKey | Number, String | 0 | - |