# The Component: FbCol
The `<fb-col>` is the column component that must always be placed inside an `FbRow`. It uses a 12-column grid system, allowing precise divisions and specific adjustments for different screen sizes (mobile, tablet, desktop).

## Features
**12-Unit Grid:** Full flexibility to divide the row into halves (6), thirds (4), quarters (3), etc.

**Responsive Breakpoints:** Native support for sm, md, lg, and xl.

**Direct DSL Integration:** When you write `Name::md6`, the framework core automatically passes the value `6` to the `md` prop of this component.

## How to Use
### Manual Usage
You can use columns to create complex layouts outside of the automatic `form-blocks` rendering:

```html
<fb-row>
  <fb-col cols="12" md="8">Main Column (8/12)</fb-col>
  <fb-col cols="12" md="4">Sidebar (4/12)</fb-col>
</fb-row>
```

### In the DSL (Automatic Usage)
The DSL simplifies the use of FbCol props through a short syntax:

```javascript
// 'Label::component:cols:breakpoint'
'Bio::textarea:12:lg6'
```

In the example above, the framework will render an FbCol with:

- `:cols="12"` (Takes up the full row on mobile)

- `:lg="6"` (Takes up half the row on large screens)

## Generated Classes
The component generates dynamic classes based on the PREFIX (e.g.: fb). If you set `<fb-col cols="12" md="6">`, the applied classes will be:

`.fb-col:` Base class with padding (gutter).

`.fb-col-12:` Sets flex: 0 0 100% and max-width: 100%.

`.fb-col-md-6:` Applies flex: 0 0 50% and max-width: 50% within the 768px media query.

## Grid Tip
If you don't define any width (cols or breakpoints), the default behavior will depend on your design system's CSS (usually taking up 100% of the width or behaving as flex-grow). To ensure consistency in forms, always define at least the base width or the `md` breakpoint.

## Backdoor
### Props

| Prop | Type | Default | Description |
|------|:----:|---------|-------------|
| cols | String\|Number | null | Base width (mobile-first). E.g.: 12. |
| tag | String | 'div' | The HTML tag of the column. |
| sm | String\|Number | null | Width on Small screens. |
| md | String\|Number | null | Width on Medium screens. |
| lg | String\|Number | null | Width on Large screens. |
| xl | String\|Number | null | Width on Extra Large screens. |