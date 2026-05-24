# The Component: FormBlocksRepeaterItem

The `<form-blocks-repeater-item>` component is responsible for rendering a single row (or instance) inside a repeater group.

It acts as a mediator between the repeater data array and the individual input fields.

## Core Responsibilities

1. **Scope Isolation:**  
   Transforms the current row data object into a reactive `ref`, ensuring that updates to one item do not unexpectedly affect others.

2. **Unique Identification (Dynamic IDs):**  
   Generates exclusive IDs for each input in the row, allowing `<label>` tags to function correctly (accessibility) even when the same form appears multiple times on the page.

3. **Error Mapping:**  
   Cross-references global error keys with the fields belonging to that specific repeater instance.

4. **Design System Resolution:**  
   Consults the `Registry` to understand the capabilities of each component  
   (such as support for the `label-for` attribute).

# Unique Identification Logic

To avoid DOM ID collisions, the component generates keys following this pattern:
`fb-{uid}-{index}-{model}`

This guarantees that if you have two "Phone" repeaters on the same page, clicking the label for "Phone 1" in the first repeater will not activate the input belonging to "Phone 1" in the second repeater.

## Slots and Extensibility
Just like the main group component, `FormBlocksRepeaterItem` respects the slot hierarchy.
You can customize a specific input only when it exists inside a repeater:

```vue
<form-blocks v-model="formData" :groups="groups">

  <!-- Customizing the 'value' input
       only when inside a repeater -->

  <template #input(valor)="{ input, index }">
    <div class="custom-repeater-field">
      <input v-model="formData.contacts[index].value" />
      <span>Índice da linha: {{ index }}</span>
    </div>
  </template>
</form-blocks>
```

## Rendering Behavior
The component uses `FbInputBlock` as the container for each field.
It automatically injects:

- **Error Feedback:** Looks up the injected `errors` object to determine whether there is a validation error for `input.back`.

- **Label Support:** Checks the `Registry` to determine whether the target component supports the `labelFor` prop. If not (as with some third-party components), the automatic link is disabled to prevent console warnings and accessibility issues.

- **Grid Encapsulation:** Applies `colProps` (defined in the DSL) directly to the column wrapping the field.

## Technical Note
The use of `toRef(props, 'formData')` inside setup() is what allow `createInputNode` to maintain efficient bidirectional reactivity (`v-model`), updating the original object inside the parent repeater array.

### Rendering Tree Completed!
With this, the entire rendering architecture has now been documented:

1. **FormBlocks** (Root)

2. **FormGroupBlocks** (Group Layout / Logic)

3. **FormBlocksRepeater** (List Orchestrator)

4. **FormBlocksRepeaterItem** (List Instance)

5. **FormInputsBlocks** (Input Atom)

## Backdoor
### Props

| Prop | Type | Default | Description |
|------|:----:|:-----------:|-----------|
|forms |Array| []|List of field definitions for this row.|
|formData |Object| {}|Data object specific to this repeater instance.|
|uid |String| 'uid'|Unique identifier of the parent repeater.|
|index |Number| undefined|Position (index) of this item inside the global array.|
