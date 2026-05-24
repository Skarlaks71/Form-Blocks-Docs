# The Component: FormBlocks

The `<form-blocks>` component is the single entry point for rendering your forms.

It is responsible for managing global reactivity, injecting validation errors, and providing customization slots for every level of the hierarchy.

## Slot System (Extreme Customization)

The core flexibility of Form Blocks lies in its dynamic slot system.

You can intercept rendering at three levels: **Group**, **Input**, and **Repeater**.

### 1. Group Slot: `group(key)`

Allows you to replace the rendering of an entire block of fields.

```vue
<form-blocks v-model="formData" :groups="groups">
  <!-- Where '0' is the group index or the key defined in groupBase -->
  <template #group(0)="{ group }">
    <div class="meu-layout-customizado">
      <h4>{{ group.title }}</h4>
      <!-- Render anything you want here -->
    </div>
  </template>
</form-blocks>
```

### 2. Input Slot: input(key)
Allows you to replace a specific field while preserving the rest of the form.
Very useful for complex fields such as file uploads or text editors.

```vue
<form-blocks v-model="formData" :groups="groups">
  <template #input(full_name)="{ form }">
    <label>Special Name:</label>
    <input v-model="formData.full_name" class="custom-input" />
  </template>
</form-blocks>
```

### 3. Repeater Slot: form-repeater
If you want to completely customize how the "Add / Remove item" interface works.

```vue
<form-blocks v-model="formData" :groups="groups">
  <template #form-repeater="{ form, groupModel }">
    <!-- Your custom loop logic for repeatable fields -->
  </template>
</form-blocks>
```

## Internal Architecture
To ensure the framework remains performant and easy to use, it leverages native Vue 3 technologies.

### Dependency Injection (Provide/Inject)
The root component provides both `formData` and the `errors` object to every child component (_**Inputs, Repeaters, Rows**_).
This means you never need to manually pass props through multiple levels.

### Functional Rendering (h())
As seen in the source code, the framework uses **Render Function** to keep rendering extremely lightweight.
This allows the framework to dynamically decide whether it should render a standard `FbInput` or a `flatpickr` component based on your DSL configuration.

### Repeater Lifecycle
The `FormBlocksRepeater` component is intelligent by design:

1. **Auto-init:** If the model array is empty, the first item is automatically added during `onMounted`.

2. **Soft-delete:** If an item already exists in the database (contains a type or id), removing it will mark it as: `deleted: true` instead of removing it from the array.
This greatly simplifies backend synchronization.

## Method Exposure (expose)
If you need to access the internal state through a `ref` in the parent component:

```javascript
const formRef = ref(null)

// Accessing current form data
console.log(formRef.value.formData)
```
```vue
<form-blocks ref="formRef" v-model="formData" :groups="groups" />
```

## Performance Tip
Always define your `backVars and groupBase` outside the render cycle, or use `computed` values.
This prevents `makeGroups` from being unnecessarily re-executed, which would cause input components to be remounted.

## Backdoor
### Props

| Prop | Type | Required | Description |
|------|:----:|-------------|-----------|
| v-model (FormData) | Object | Yes | The form state object (formData). |
| groups | Array | Yes | The group array processed by makeGroups. |
| errors | Object | No | Object containing validation error messages mapped by model keys. |