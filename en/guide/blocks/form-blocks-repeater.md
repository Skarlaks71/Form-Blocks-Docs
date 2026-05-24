# The Component: FormBlocksRepeater

The `<form-blocks-repeater>` component is responsible for managing dynamic lists of fields.
It allows users to add or remove "blocks" of information (such as multiple addresses, phone numbers, or dependents) in a fully reactive way.

## Core Features

- **Automatic Array Management:**  
  Initializes and manipulates arrays inside the global `formData`.

- **Deep Cloning:**  
  Ensures that newly added items are clean copies of the original template, avoiding shared memory references.

- **Soft Delete:**  
  Implements intelligent deletion logic where items loaded from the database are marked as `deleted: true` instead of being physically removed from the array. This simplifies backend synchronization.

- **Unique IDs:** Generates random IDs to ensure that labels and inputs inside each repeater item never conflict with one another.

## Data Flow Logic
### Initialization
When mounted (`onMounted`), if the array defined in `groupModel` is empty, the repeater automatically calls `addItem()` to guarantee that the user always sees at least one available block of fields.

### The removeItem Method
Unlike a regular splice, the repeater follows this logic:

1. If the item contains a type property (indicating it already exists in the backend), it receives: `deleted: true`

2. The row receives the CSS class `.fb-disabled-row-repeater`, making it visually disabled.

3. If the item was created locally, it is immediately removed from the array.

## Child Components
The repeater splits its responsibilities into two layers:

1. **FormBlocksRepeater** Responsible for:

    -  Managing the global array
    -  Rendering the `TransitionGroup`
    -  Rendering the primary action buttons

2. **FormBlocksRepeaterItem:** Responsible for rendering each individual row.
It generates a uniqueId for every input, ensuring that the `<label for="">` attribute correctly points to the matching field inside that specific row.

## Usage Example (DSL)
To enable repeater mode in a group, use the `isRepeater` flag inside your `groupBase`:

```javascript
{
  title: 'Contatos',
  isRepeater: true,
  groupModel: 'contacts',
  groupFormData: { type: null, value: '' }, // Item template
  forms: [
    ['Tipo::select:md4', typeOptions],
    'Valor::md8',
  ],
}
```

## Slots and Customization
You can intercept repeater rendering in two ways:

1. **Global Button Customization**
Through repeaterProps inside the group object, you can pass variants, textures, and styles supported by your design system.

2. **Full Repeater Override**
If you need a completely different repeater layout
(for example, a table instead of rows), use the `form-repeater` slot inside the `FormBlocks` component:

```vue
<template #form-repeater="{ form, groupModel }">
  <!-- Your custom loop implementation -->
</template>
```

## Backdoor
### Props

| Prop | Type | Default | Description |
|------|:----:|:-----------:|-----------|
| forms|Array| [] | Field definitions that will be repeated. |
| groupModel|String| 'groups' | Key inside formData where data will be stored. |
| groupFormData|Object| {} | Initial object template for new items. |
| btnAddVariant|String| 'primary' | "Add" button style variant. |
| btnAddTexture|String| 'carbon' | Adds a texture to the "Add" button (_**carbon, stripes, grid, waves**_). |
| btnAddClean|Boolean| false | Removes texture from the "Add" button. |
| btnRemoveVariant|String| 'danger' | "Remove" button style variant. |
| btnRemoveTexture|String| 'carbon' | Adds a texture to the "Remove" button (_**carbon, stripes, grid, waves**_). |
| btnRemoveClean|Boolean| false | Removes texture from the "Remove" button. |
| noTexture|Boolean| false | Removes textures from all repeater buttons. |