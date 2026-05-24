<script setup>
import { FbButton, FbCol, FbRow } from '@form-blocks/vue'
</script>

# The Component: FbButton
The `<fb-button>` is the standard action component of the Form Blocks ecosystem. It abstracts the native HTML `<button>` element and encapsulates the management of critical loading states, double-click security locks, anatomical variations (*pill, circle, flat*) and aesthetic texture treatments.

<div style="padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
    <fb-button label="Click Here 🚀" />
</div>


## Features
- **Double Submit Protection:** Automatically blocks the click event and disables the element in the DOM if the `loading` or `disabled` property is active.

- **Content Hierarchy:** Accepts simple rendering via the `label` property or rich customizations (with icons and complex markup) through its default slot.

- **Geometric Variants:** Supports quick anatomical modifiers such as pill shape (pill), perfectly circular shape (circle), and buttons without borders or relief (flat).

- **Aesthetic Texture System:** Brings coupled visual finishing styles (such as the default carbon), also allowing a "clean" version for you to apply your own CSS styling from scratch.

## How to Use
### Default Submit Button
For forms, simply pass the submit type. It will inherit the primary styling automatically:

<div style="padding: 20px; border: 1px solid var(--vp-c-divider); border-radius: 8px; margin-bottom: 16px;">

<fb-button type="submit" variant="complementary" label="Save Changes" />
    
<hr style="margin: 20px 0; border: 0; border-top: 1px solid var(--vp-c-divider);" />

<details style="cursor: pointer;">
        <summary style="font-size: 0.9em; color: var(--vp-c-text-2); font-weight: bold;">View Source Code</summary>

```vue
<fb-button type="submit" variant="complementary" label="Save Changes" />
```

</details>
</div>

### Handling Click Events Safely
You can listen to the `@click` event normally. If the button is dynamically disabled, your callback function will not be triggered:

```vue
<script setup>
const saving = ref(false)

const submitForm = async () => {
  saving.value = true
  await api.post('/data')
  saving.value = false
}
</script>

<template>
  <fb-button 
    label="Submit" 
    :loading="saving" 
    @click="submitForm" 
  />
</template>
```

### Rich Customization (Using Slots and Icons)
If you need to place an icon next to the text, ignore the `label` property and use the component body (`default slot`):

```html
<fb-button variant="success">
  <i class="fa fa-check"></i>
  <span>Confirm Purchase</span>
</fb-button>
```

### Anatomical Variants (pill, circle, flat)
Perfect for building dynamic interfaces, toolbars, or modal close buttons:

<div style="padding: 20px; border: 1px solid var(--vp-c-divider); border-radius: 8px; margin-bottom: 16px;">
<fb-row>
    <fb-col cols="4">
        <fb-button label="Subscribe Now" pill variant="warning" />
    </fb-col>
    <fb-col cols="2">
        <fb-button circle variant="danger">
            X
        </fb-button>
    </fb-col>
    <fb-col cols="4">
        <fb-button label="Cancel" flat />
    </fb-col>
</fb-row>
    
<hr style="margin: 20px 0; border: 0; border-top: 1px solid var(--vp-c-divider);" />

<details style="cursor: pointer;">
    <summary style="font-size: 0.9em; color: var(--vp-c-text-2); font-weight: bold;">View Source Code</summary>

```html
<fb-button label="Subscribe Now" pill variant="warning" />

<fb-button circle variant="danger">
  <i class="fa fa-trash"></i>
</fb-button>

<fb-button label="Cancel" flat />
```

</details>
</div>

## CSS Classes and BEM Structure
The component's render tree generates the following classes based on the global prefix:

`.fb-button:` The base class applied to the `<button>` tag.

  - **State Modifiers:** _--disabled, --loading_.

  - **Anatomy Modifiers:** _--pill, --circle, --flat_.

  - **Thematic Modifiers:** _--[variant] (e.g.: --primary, --success) and --texture-[name] (e.g.: --texture-carbon, --clean)_.

`.fb-button__loader:` The `<span>` element dynamically injected to style the rotation indicator (spinner) when loading is true.

`.fb-button__content:` The `<span>` container that wraps the text or elements passed through the slot, ensuring correct alignment via Flexbox/Grid in CSS.

## Dynamic Texture System (texture)
One of the greatest aesthetic differentials of FbButton is its texture engine based on CSS masks (mask-image). Instead of using static images or heavy gradients, the framework uses ultra-lightweight native SVG vectors that repeat infinitely.

Since the texture acts as an opacity mask, it automatically inherits and reacts to the background color defined in the `variant` property.

<div style="padding: 20px; border: 1px solid var(--vp-c-divider); border-radius: 8px; margin-bottom: 16px;">
<fb-row>
    <fb-col cols="3">
        <fb-button variant="danger" texture="stripes" label="Stripes" />
    </fb-col>
    <fb-col cols="3">
        <fb-button variant="success" texture="waves" label="Waves" />
    </fb-col>
    <fb-col cols="3">
        <fb-button variant="primary" label="Carbon" />
    </fb-col>
    <fb-col cols="3">
        <fb-button variant="complementary" texture="grid" label="Grid" />
    </fb-col>
</fb-row>
    
<hr style="margin: 20px 0; border: 0; border-top: 1px solid var(--vp-c-divider);" />

<details style="cursor: pointer;">
    <summary style="font-size: 0.9em; color: var(--vp-c-text-2); font-weight: bold;">View Source Code</summary>

```html
<fb-row>
    <fb-col cols="3">
        <fb-button variant="danger" texture="stripes" label="Stripes" />
    </fb-col>
    <fb-col cols="3">
        <fb-button variant="success" texture="waves" label="Waves" />
    </fb-col>
    <fb-col cols="3">
        <fb-button variant="primary" label="Carbon" />
    </fb-col>
    <fb-col cols="3">
        <fb-button variant="complementary" texture="grid" label="Grid" />
    </fb-col>
</fb-row>
```

</details>
</div>

### Available Variants
The framework provides 4 geometric patterns built via SCSS Mixins. You can switch between them by passing the corresponding name in the `texture` prop:

| Value | Visual Style | Recommendation |
|-------|-------------|----------------|
| "carbon" | Micrometric interlaced geometric pattern (carbon fiber style). | **Framework Default.** Excellent for main buttons that need a robust and modern look. |
| "stripes" | Parallel diagonal lines inclined at 45°. | Perfect for warning buttons, destructive actions, or attention states. |
| "grid" | Technical and minimalist grid mesh (Pine Style). | Great for dashboard interfaces, analytical tools, or technical themes. |
| "waves" | Sequential organic and fluid undulations. | Ideal for creative interfaces, light interactions, or more relaxed themes. |

### Removing Textures (clean)
If you prefer a minimalist flat look, without any type of relief or texture on the actions, simply activate the `clean` flag. It clears the mask mixins and leaves the variant color completely flat:

<div style="padding: 20px; border: 1px solid var(--vp-c-divider); border-radius: 8px; margin-bottom: 16px;">
<fb-button variant="complementary" clean label="Button without texture" />
    
<hr style="margin: 20px 0; border: 0; border-top: 1px solid var(--vp-c-divider);" />

<details style="cursor: pointer;">
    <summary style="font-size: 0.9em; color: var(--vp-c-text-2); font-weight: bold;">View Source Code</summary>

```vue
<fb-button variant="complementary" clean label="Button without texture" />
```

</details>
</div>

::: tip
**💡 Performance Note:** By using optimized SVG strings directly in the code, these textures generate zero additional HTTP requests to the server, ensuring that the form's visual loading happens instantaneously at 60fps.
:::

## Short-Circuit Logic
The component implements a two-layer check for action blocking. In the setup block, the `isDisabled` constant is computed by evaluating whether `props.disabled || props.loading` is true.

This property not only applies the `--disabled` CSS class and injects the native disabled attribute in the HTML, but also serves as a short-circuit in the `handleClick` function:

```javascript
const handleClick = (e) => {
  if (isDisabled.value) return // JavaScript-level block
  emit('click', e)
}
```

This ensures immunity against users who try to inspect the code and remove the disabled attribute via the browser console to attempt to resend malicious requests.

## Backdoor
### Props

| Prop | Type | Default | Description |
|------|:----:|---------|-------------|
| label | String | '' | The text to be displayed inside the button (ignored if the default slot is used). |
| type | String | 'button' | The native HTML type attribute: 'button', 'submit' or 'reset'. |
| variant | String | 'primary' | The button's thematic color variation (e.g.: primary, success, danger). |
| texture | String | 'carbon' | The texture/visual finishing pattern applied to the button (default: carbon, stripes, waves, grid). |
| clean | Boolean | false | If **true**, removes the pre-defined textures, making custom styling easier. |
| loading | Boolean | false | Activates the loading state. Displays a visual indicator (spinner) and blocks new clicks. |
| disabled | Boolean | false | Disables interaction with the button. |
| pill | Boolean | false | Applies fully rounded corners in the pill style. |
| circle | Boolean | false | Forces perfectly square/circular proportions (excellent for single icon buttons). |
| flat | Boolean | false | Removes heavy backgrounds and borders, transforming it into a minimalist/textual button. |
