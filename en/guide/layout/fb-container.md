# The Component: FbContainer
The `<fb-container>` is the highest-level component for layout organization. It centers the content and provides the necessary side margins for the internal grid to work properly.

## Features
- **Automatic Centering:** Keeps the form centered on large screens.

- **Responsiveness:** Adapts the maximum width based on the system's breakpoints.

- **Fluid Mode:** Allows the container to occupy 100% of the available width at any resolution.

## How to Use
### Default Usage
Ideal for centered forms with controlled maximum width.

```html
<fb-container>
  <!-- Your form here -->
</fb-container>
```

### Fluid Layout
Useful when the form is inside modals or sidebars where you need to fill all the horizontal space.

```html
<fb-container fluid>
  <form-blocks v-model="formData" :groups="groups" />
</fb-container>
```

### Changing the Semantic Tag
To improve SEO or accessibility, you can change the root tag:

```html
<fb-container tag="section">
  <h3>Registration Data</h3>
</fb-container>
```

## Related CSS
The component applies the following classes based on the configured PREFIX:

`.fb-container:` Has a variable `max-width` per breakpoint and `margin-inline: auto`.

`.fb-container-fluid:` Has `width: 100%` and removes the `max-width` restrictions.

## Integration Tip
Although the `<form-blocks>` component already manages its own internal rows, wrapping the root component in an `FbContainer` is the best practice to ensure the layout doesn't "stick" to the edges of the browser window.

## Backdoor
### Props

| Prop | Type | Default | Description |
|------|:----:|---------|-------------|
| fluid | Boolean | false | If true, the container takes up the full screen width (.fb-container-fluid). |
| tag | String | 'div' | Allows changing the rendered HTML tag (e.g.: section, form, main). |
