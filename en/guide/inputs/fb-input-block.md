# The Component: FbInputBlock
The `<fb-input-block>` works as the standard structural and accessibility container for form controls. It manages the visual and semantic lifecycle of labels, helper text (Help Text), and validation error messages.

## Features
- **Native Accessibility (WCAG):** Ensures the correct semantic binding between the label and the internal input through auto-generated IDs and the `for` (or `htmlFor`) attribute.

- **Injection via Scoped Slots:** Intelligently passes structural metadata (`id, state, ariaDescribedby`) to child components nested in its default slot.

- **Screen Reader Support:** Includes support for hidden labels (`labelSrOnly`) and real-time assertions for validation errors via `aria-live="assertive"`.

- **Semantic Conditional Rendering:** Dynamically changes the label's wrapping tag between `label` (for text inputs) and `span` (for complex blocks like Radio/Checkbox groupings) depending on context.

## How to Use
1. **Traditional Usage (Coupled with FbInput)**

The `FbInputBlock` shares its reactive properties and metadata directly with children that inherit the default slot properties (`slotProps`):

```html
<fb-input-block 
  label="Full Name" 
  description="Enter your name exactly as it appears on your ID."
>
  <template #default="slotProps">
    <fb-input 
      v-model="user" 
      v-bind="slotProps" 
      placeholder="Type here..." 
    />
  </template>
</fb-input-block>
```

2. **Error Handling and Dynamic Validation**

When assuming an invalid state, the component activates an assertive announcement channel for screen readers and exposes the error immediately below the block:

```html
<fb-input-block 
  label="Corporate Email" 
  :state="false"
  invalid-feedback="The provided address does not belong to a valid organization."
>
  <template #default="slotProps">
    <fb-input v-model="email" v-bind="slotProps" type="email" />
  </template>
</fb-input-block>
```

3. **Multiple Elements Scenarios (e.g.: Checkbox/Radio)**

For selection groups, clicking the block's main label should not blindly focus the first element. Passing `:label-for="false"` transforms the top label into a safe structural `<span>` element, while the `FbCheckbox` manages its own internal identifiers cleanly:

```html
<fb-input-block label="Choose your plans" :label-for="false">
  <template #default="slotProps">
    <fb-checkbox 
      v-model="myPlans" 
      name="plan_choice" 
      multiple 
      v-bind="slotProps"
      :options="[
        { label: 'Basic Plan', value: 'basic' },
        { label: 'Premium Plan', value: 'premium' }
      ]"
    />
  </template>
</fb-input-block>
```

## CSS Classes and BEM Structure
The stylesheet should respond to the generated semantic tree:

- **.fb-input-block:** The generic container that wraps the entire field set.

- **.fb-input-block__label:** Applied to the label text element.

    - **Modifiers:** `--block` (when rendered as `<span>`), `--sr-only` (visually hidden via accessibility utility rules), `--left, --center, --right`.

- **.fb-input-block__description:** Style for the small helper text (Help Text).

- **.fb-input-block__feedback:** Style dedicated to the error block. Natively forces `display: block` to ensure compatibility with utility structures like Bootstrap CSS.

## Hidden Accessibility Engineering
The great power of this component lies in the dynamic generation of the `aria-describedby` attribute. When `FbInputBlock` detects a description or an active error string, it concatenates the references generating a string like: `fb-field-12345__description fb-field-12345__feedback`.

By applying the slot properties (`v-bind="slotProps"`) to the actual input, these IDs are linked to the user's screen reader. This means that when focusing on the input field, the accessibility software automatically reads the label, the helper text, and instantly warns if there is any error to be corrected before the user needs to submit the form.

## Backdoor
### Props

| Prop | Type | Default | Description |
|------|:----:|---------|-------------|
| id | String | 'fb-field-[hash]' | Stable auto-generated unique identifier (can be manually overridden). |
| label | String | null | The label text displayed above or beside the field. |
| labelAlign | String | 'left' | Label text alignment: `'left'`, `'center'` or `'right'`. |
| labelClass | String\|Array\|Object | '' | Additional custom CSS classes for label styling. |
| description | String | null | Auxiliary helper text (Help Text) to guide the user when filling out the field. |
| descriptionClass | String\|Array\|Object | '' | Custom CSS classes for the description area. |
| invalidFeedback | String | '' | Explanatory text message displayed when the field assumes state: false. |
| state | Boolean\|null | null | Field validation state: true (valid), false (invalid). |
| labelSrOnly | Boolean | false | If true, visually hides the label but keeps it readable for screen readers. |
| labelFor | Boolean\|String | false | If false, the component renders a `<span>` instead of a `<label>` to avoid breaking semantic focus in multiple selectors. |
