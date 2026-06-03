# makeGroups

`makeGroups` centralizes the form preparation flow in three automatic steps: it normalizes the groupBase by converting text shortcuts (**_DSL_**) into valid input objects, injects custom properties into the fields (such as option lists for **_selects/checkboxes/radios_**), and performs the backend variable mapping. It is the main function you use to transform abstract definitions into a fully configured group of components.

## The Function

::: details View Function
```javascript
const makeGroups = (backVars, groupBase, groupProps, options = {}) => {

    const parseFunction = options.parse || parseLimitProps

    const normalizedGroups = groupBase.map(group => ({
      ...group,
      forms: group.forms.map(input => {
        // If it's a string, turn it into an object with label
        if (typeof input === 'string') {
          return parseStringShorthand(input)
        }
        if (Array.isArray(input)) {
          if (typeof input[0] !== 'string') {
            throw new Error('FB 001: The first element needs to be String!')
          }

          const parse = parseStringShorthand(input[0])
          parse.iProps = { ...parse.iProps, options: input[1] }
          return parse
        }
        return input
      })
    }))

    createInternalProps(normalizedGroups, backVars, groupProps, parseFunction)

    return normalizedGroups
}
```
:::

## Parameters

### backVars

Array of strings with the database model field names that the frontend will receive and send to the backend. These strings must be written in **_snake_case_**. If your backend uses a different naming convention, a custom **_parseFunction_** must be provided. These strings will be automatically converted to model keys via the default parseFunction (**parseLimitProps**) and assigned to formData.

### groupBase

Definition array containing the configuration objects for the form's groups, forms, and repeaters.

### groupProps

Definition array used to connect backVars to the inputs of the corresponding groups.

```vue
<script setup>
const backVars = ['full_name', 'email', 'password']

const { groupBase } = useRegisterForm()
const groups = makeGroups(groupBase, backVars, [3]) // groupProps is an array with the number of variables that group has.
</script>
```

::: warning Important
Each input in a group must have a corresponding backVar. So if you have a single group with 5 inputs, you must have 5 backVars and pass `groupProps = [5]`.
:::

If your form has more than one group, you are free to choose how to map them in the way that best fits your groups.

```vue
<script setup>
const backVars = [
    'full_name',
    'email',
    'password',
    'zipcode',
    'street',
    'number',
    'complement',
]

const { groupBase } = useRegisterForm()
const groups = makeGroups(groupBase, backVars, [3, [3, 7]])
</script>
```

#### Explaining the limitOrRange syntax: [3, [3, 7]]

`groupProps` looks at the first element of the array and checks whether it is a number or an array. If it is just a number, it means it is a **limit** — all items up to that position will be selected. So for that backVars the items will be: `'full_name'`, `'email'`, and `'password'`, which are the first 3 items.

Next, groupProps moves to the next element, which is an array, so in this case it is a **Range** of `[start, end (exclusive)]`. Since we are dealing with arrays, the first **index is 0**. So if our backVars has 7 items and we set `start = 3 ([3, 7])`, our **Range** starts at `'zipcode'` and ends at `'complement'`. Because the **end** of our **Range** is **exclusive**, it only goes up to the predecessor (**_end - 1_**) — in this case the sixth index since our `end = 7 ([3, 7])`.

### options (Optional)

A definition object used exclusively to pass your preferred parse function to `createInternalProps`.

A parse function that replaces the one used in `parseLimitProps` for converting backVars strings from **_snake_case_** to **_camelCase_**.

## Return

Returns a normalized array of groups with all model and backend variables already assigned to their respective inputs.

## Errors

If any form within a group is written in DSL mode using the array syntax (**[string, options]**) and the first element is not a string, the system will throw the following error:

```js
FB 001: The first element needs to be String! // [!code error]
```
