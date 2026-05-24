# The Component: FbTextarea
The `<fb-textarea>` is a component designed for inserting long, multi-line text. It extends the native HTML `<textarea>` tag, adding an intelligent automatic height resizing system (Auto-Grow), safety limits per line, runtime formatting (Lazy or immediate), and validation states.

## Features
- **Intelligent Auto-Grow:** Automatically expands and contracts its height vertically as the user types, eliminating unnecessary scrollbars.

- **Height Ceiling (maxRows):** Allows limiting the maximum number of expansion lines. When the limit is reached, the component smoothly activates internal scroll behavior.

- **Flexible Formatting (Lazy Formatter):** Supports processing the entered text instantly or only when the field loses focus (change), reducing unnecessary processing costs for long texts.

- **Inheritance and Resize Lock:** Preserves all native attributes and offers the `noResize` flag to lock manual corner control by the browser, ensuring layout integrity.

## How to Use
### Basic Usage with Native Auto-Grow
By default, the component already calculates the required height based on the entered text, without needing complex configurations.

```vue
<fb-textarea 
  v-model="comment" 
  placeholder="Leave your opinion about the product..." 
/>
```

### Limiting Maximum Expansion (maxRows and noResize)
To maintain aesthetic control of your screen design and prevent users from breaking the layout by manually stretching the block:

```vue
<fb-textarea 
  v-model="biography" 
  :rows="3"
  :max-rows="6"
  no-resize
  placeholder="Tell us a little about yourself (Max. 6 lines)..." 
/>
```

### Optimization with Lazy Formatting (lazy-formatter)
Processing very long strings on every keystroke can cause UI lag. Enabling the `lazy-formatter` property ensures that text cleanup or processing only happens when the user finishes editing (the `blur/change` event):

```vue
<script setup>
// Removes consecutive extra spaces and trims the string
const cleanTextFormatter = (value) => value.replace(/\s+/g, ' ').trim()
</script>

<template>
  <fb-textarea 
    v-model="articleText" 
    :formatter="cleanTextFormatter" 
    lazy-formatter
    placeholder="Write your article here..." 
  />
</template>
```

## CSS Classes and Customization
The markup emits standardized styles using the framework's global conventions:

`.fb-textarea:` The base class injected directly into the `<textarea>` element.

`.fb-textarea--valid:` Activated when `:state="true"`. Modifies borders and shadows to indicate success.

`.fb-textarea--invalid:` Activated when `:state="false"`. Modifies the element's color to indicate a fill error.

`.fb-textarea--no-resize:` Applies the CSS rule `resize: none;` to block native resizing.

## Logic Under the Hood: The Auto-Grow Cycle
The `FbTextarea` manipulates the DOM's physical scroll properties to know the exact size of the user's text. At the moment of input (and also when loading asynchronous data monitored via watch), the component executes the following steps:

1. The framework temporarily clears the height style by forcing it to `auto` (if `noAutoShrink` is **false**), allowing the element to discover its smallest possible real height.

2. It calculates the `scrollHeight` (the total internal scroll height of the content).

3. If the `scrollHeight` exceeds the estimated `maxRows` calculation (based on a `line-height` multiplier), the component locks the height at the configured ceiling and changes the flow to `overflow-y: scroll`. Otherwise, it perfectly expands the element and hides the scrollbar (`overflow-y: hidden`).

Everything happens encapsulated in a Vue `nextTick` cycle, ensuring the screen never suffers visual flickering during typing.

## Backdoor
### Props

| Prop | Type | Default | Description |
|------|:----:|---------|-------------|
| modelValue | String\|Number | '' | The text value bound to the component (supports v-model). |
| formatter | Function | null | Function executed to modify or process the string entered by the user. |
| lazyFormatter | Boolean | false | If **true**, the formatter function will only run on the change event (when the user blurs the field). |
| rows | String\|Number | 2 | Initial field height based on the estimated number of lines. |
| maxRows | String\|Number | null | Maximum number of lines the field can expand before activating the scrollbar. |
| noResize | Boolean | false | Disables the native browser handle that allows the user to drag and resize the field. |
| noAutoShrink | Boolean | false | If true, prevents the component from shrinking when the user deletes text. |
| state | Boolean\|null | null | Field validation state: true (valid), false (invalid). |
| wrap | String | 'soft' | Native HTML line-breaking behavior ('soft' or 'hard'). |
| limit | Number\|String | null | Directly maps the native `maxlength` attribute on the element. |
