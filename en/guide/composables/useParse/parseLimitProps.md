# parseLimitProps

Converts a list of fields into a structure compatible with Form Blocks, automatically generating the `model` and `back` properties used by the framework. The function also allows limiting or selecting specific ranges of the processed items.

## Function

::: details View Function
```js
const parseLimitProps = (stringsArray, limitOrRange = [0, stringsArray.length]) => {
    const toCamelCase = (str) => {
      return str
        .replace(/[-_ ](.)/g, (_, char) => char.toUpperCase()) // Converts dashes, underscores and spaces to camelCase
        .replace(/^(.)/, (match) => match.toLowerCase()); // Ensures the first character is lowercase
    };

    let start = 0, end = stringsArray.length;

    // If it's a number, set it as the maximum limit
    if (typeof limitOrRange === "number") {
      end = Math.min(limitOrRange, stringsArray.length);
    }
    // If it's an array [start, end]
    else if (Array.isArray(limitOrRange) && limitOrRange.length === 2) {
      [start, end] = limitOrRange;
      end = Math.min(end, stringsArray.length); // Prevents exceeding the array size
    }

    return stringsArray.slice(start, end).flatMap(item => {
      if (Array.isArray(item) && item.length > 2) {
        const [groupName, _, ...values] = item
        return values.map(str => ({ model: toCamelCase(str), back: `${groupName}.${str}` }));
      } else if (typeof item === "string") {
        return { model: toCamelCase(item), back: item };
      }
      return [];
    });
}
```
:::

## Parameters

### stringsArray

Array containing the field names to be converted to the format used internally by Form Blocks.

The array accepts two formats:

#### Simple Fields

```js
[
  'first_name',
  'last_name',
  'email'
]
```

#### Grouped Fields

```js
[
  ['contacts', null, 'type', 'value']
]
```

In this case, the first element represents the group and the subsequent values represent the fields belonging to it.

### limitOrRange (Optional)

Defines which elements of stringsArray will be processed.

Accepts:

#### Number

Limits the maximum number of items processed from the beginning of the array.

```js
parseLimitProps(fields, 3)

// equivalent to:

fields.slice(0, 3)
```

#### Range

An array containing the start and end positions.

```js
parseLimitProps(fields, [2, 5])

// equivalent to:

fields.slice(2, 5)
```

> The second value follows the default behavior of `Array.slice()`, being exclusive.

If no value is provided, all items will be processed.

## Return

Returns an array of objects containing the properties used by Form Blocks to bind the fields to the form state.

## Examples

### Input Example

```js
[
  'first_name',
  'email'
]
```

### Output

```js
[
  {
    model: 'firstName',
    back: 'first_name'
  },
  {
    model: 'email',
    back: 'email'
  }
]
```

### Input Example with Group

```js
[
  ['contacts', Array, 'type', 'value']
]
```

### Output

```js
[
  {
    model: 'type',
    back: 'contacts.type'
  },
  {
    model: 'value',
    back: 'contacts.value'
  }
]
```
