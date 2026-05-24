# The Registry

The **Registry** is the Form Blocks component catalog.  
When you define a field via DSL such as `'Name::text'`, the framework consults this catalog to determine which Vue component should be rendered for the `text` key (or `select`, `checkbox`, etc).

It already comes configured with a default set of components, but its architecture allows you to easily replace defaults or add entirely new components.

## Default Components

By default, the framework registers the following mappings:

| DSL Key | Original Component | supportsLabelFor |
|----------|-------------------|------------------|
| input | FbInput | Yes |
| select | VSelect | No |
| flatpickr | flatPickr | No |
| textarea | FbTextarea | Yes |
| radio | FbRadio | No |
| checkbox | FbCheckbox | No |

## Registering New Components

To add a custom component (such as a Rich Text Editor or File Upload), use the `registerComponent` function.

We recommend doing this inside your entry file (`main.js`) right after installing the plugin.

```javascript
import { registerComponent } from '@form-blocks/vue'
import MyCustomUpload from './components/MyCustomUpload.vue'

// Registering the component
registerComponent('upload', MyCustomUpload, {
  supportsLabelFor: false 
})
```

Now you can use it anywhere via DSL or Object syntax:

```javascript
// DSL
'Avatar::upload:md4'

// Object
{ label: 'Avatar', component: 'upload' }
```

## Registry Properties (Meta)
When registering a component, you may pass a metadata object:

- **component:** The imported Vue component (required)..

- **supportsLabelFor:** (Boolean) Defines whether the UI component exposes an internal ID that can be focused via: `<label for="ID">`.
  - **Note:** Custom Select components often do not expose the real internal input, so we set this to `false` to avoid unexpected accessibility behavior.

## Replacing Default Components

If you don't like the default `VSelect` or want to use your own Input instead of `FbInpu`t, simply register a new component using the **same key**:

```javascript
import MyDesignSystemInput from './components/MyDesignSystemInput.vue'

// Replaces the framework default input with yours
registerComponent('input', MyDesignSystemInput)
```

This way, your entire application will automatically start using `MyDesignSystemInput` whenever the DSL is processed.

## Requirements for Custom Components

For your component to work seamlessly with Form Blocks, it must follow the standard Vue 3 `v-model` convention:

**Prop:** It must accept a prop named `modelValue`.

**Event:** It must emit the following event whenever the value changes `update:modelValue`

```vue
<!-- Compatible component example -->
<script setup>
  defineProps(['modelValue'])
  defineEmits(['update:modelValue'])
</script>
<template>
  <input 
    :value="modelValue" 
    @input="$emit('update:modelValue', $event.target.value)" 
  />
</template>
```

## Organization Tip

If your project uses many third-party components, create a file called: `form-blocks-setup.js` to centralize all your `registerComponent` calls, then import it inside your `main.js`.
This keeps your initialization code clean and easier to maintain.
