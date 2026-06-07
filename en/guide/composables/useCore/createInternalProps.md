# createInternalProps

`createInternalProps` automatically binds your database variables to the visual inputs of your form. It scans your API keys, splits them among the corresponding input groups using Limit or Range rules, and injects the processed, reactivity-ready properties into the form's rendering structure.

## The Function

::: details View Function
```javascript
const createInternalProps = (groupBase, backVars, groupProps, parseFunction = parseLimitProps) => {
    const props = []
    groupProps.forEach(gp => props.push(parseFunction(backVars, gp)))
    groupBase.forEach((group, index) => {
        group.forms = group.forms.map((input, indexForm) => ({
        ...input,
        ...props[index][indexForm],
        }))
    })
}
```
:::

## Parameters

### groupBase

Definition array containing the configuration objects for the form's groups, forms, and repeaters.

### backVars

Array of strings with the database model field names that the frontend will receive and send to the backend. These strings must be written in **_snake_case_**. If your backend uses a different naming convention, a custom **_parseFunction_** must be provided. These strings will be automatically converted to model keys via the default parseFunction (**parseLimitProps**) and assigned to formData.

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

Next, groupProps moves to the next element, which is an array, so in this case it is a **Range** of `[start, end (exclusive)]`. Since we are dealing with arrays, the first **index is 0**. So if our backVars has 7 items and we set `start = 3 ([3, 7])`, our **Range** starts at `'zipcode'` and ends at `'complement'`. But why at `'complement'` if it is at the sixth index of the array?

Because the **end** of our **Range** is **exclusive**, meaning it only goes up to the predecessor (**_end - 1_**).

```js
0   1   2   3   4   5   6   7
|   |   |   |   |   |   |   |
A   B   C   D   E   F   G
            ^           ^
          start         end
```

In this case the sixth index, since our `end = 7 ([3, 7])`.

### parseFunction (Optional)

A parse function that replaces the one used in `parseLimitProps` for converting backVars strings from **_snake_case_** to **_camelCase_**.
