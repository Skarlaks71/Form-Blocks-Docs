# The Component: FbRow
The `<fb-row>` creates a flexible row context for the grid system. It is designed to contain `FbCol` components, ensuring that form fields are correctly aligned and respect the spacing (gutters) defined in the design system.

## Features
- **Flexbox Layout:** Uses `display: flex` with line-breaking support (`flex-wrap`).

- **Spacing Management:** Applies negative margins to compensate for column padding, maintaining perfect alignment with the container.

- **Gutter Control:** Allows completely removing the spacing between columns when needed.

## How to Use
### Basic Usage
In Form Blocks, `FbRow` is used internally in each field group, but you can also use it manually for custom layouts:

```html
<fb-row>
  <fb-col md="6">Field A</fb-col>
  <fb-col md="6">Field B</fb-col>
</fb-row>
```

### No Gutters
Ideal for when you need fields to be "stuck" together, such as in a button group or a search field with an attachment.

```html
<fb-row no-gutters>
  <fb-col>Field stuck to the next one</fb-col>
</fb-row>
```

## Related CSS
The applied classes follow the framework's prefix pattern:

`.fb-row:` Sets `display: flex, flex-wrap: wrap` and the compensating negative margins.

`.fb-no-gutters:` Removes the row margins and zeroes out the padding of any `.fb-col` inside it.

## Internal Behavior and DSL
The `FbRow` is the component that receives the transition animations (fade) when an entire group of fields is shown or hidden through the `dependent` property. It also automatically manages the top margin to visually separate different form groups.

## Backdoor
### Props

| Prop | Type | Default | Description |
|------|:----:|---------|-------------|
| noGutters | Boolean | false | If true, removes the negative row margins and the padding of child columns. |
| tag | String | 'div' | Sets the HTML tag of the row (e.g.: section, ul). |
