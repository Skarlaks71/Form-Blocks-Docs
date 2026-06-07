# parseStringShorthand

Converts a **DSL** (**_Designed Shorthand Language_**) string into a configuration object compatible with **Form Blocks**.

This is the main function responsible for interpreting **DSL** shortcuts, identifying component types, properties, responsive grids, and boolean flags through the **Matchers** system.

::: tip Note
The function has no specific knowledge about components, grids, or properties.

All interpretation logic is delegated to the: `DSL_MATCHERS` system.
:::

## Function

::: details View Function
```js
const parseStringShorthand = (inputString) => {
    // 1. Separates the Label from the rest of the configuration
    const [label, ...configSegments] = inputString.split('::')
    const result = { label }

    if (configSegments.length > 0) {
      // Gets all segments after :: (e.g.: password:6:md4 -> ['password', '6', 'md4'])
      const parts = configSegments[0].split(':')
      
      parts.forEach(part => {
        let matched = false;

        for (const matcher of DSL_MATCHERS) {
          const matchResult = matcher.test(part);
          
          if (matchResult) {
            matcher.apply(result, matchResult);
            matched = true;
            break; // Stops at the first match found
          }
        }

        // Default case: If nothing matched and it's not empty, assumes it's a boolean true prop
        // e.g.: "Name::text:disabled"
        if (!matched) {
          result.iProps = { ...result.iProps, [part]: true }
        }
      })
    }

    return result
}
```
:::

## Parameters

### inputString

String formatted using the Form Blocks DSL syntax.

Basic structure:

```
'Label::configuration:configuration'
```

Valid examples:
```js
'Name'

'Password::password'

'Email::email:md6'

'Age::number:min=18:max=99'

'Bio::required:disabled'
```

## Return

Returns an object containing the processed field configuration.

Depending on the segments found, the function may generate properties such as:

- label
- component
- iProps
- colProps
- other properties registered by Matchers

### How It Works

The parser executes the following steps:

#### 1. Label Extraction

The string is split using `::`.

```
'Email::email:md6'
```

Result:

```js
label = 'Email'
```

#### 2. Segment Separation

Everything after `::` is split using `:`.

```js
'Email::email:md6:required'
```

Result:

```js
[
  'email',
  'md6',
  'required'
]
```

#### 3. Matcher Execution

Each segment is sent to the global collection:

```js
DSL_MATCHERS
```

The first matcher capable of interpreting the segment applies its logic to the final object.

Examples:

| Segment | Matcher |
| ------- | ------- |
| email | InputTypeMatcher |
| md6 | GridMatcher |
| min=18 | iPropsMatcher |
| disabled | Fallback Boolean |

#### 4. Fallback for Boolean Flags

When no matcher recognizes a segment, it is automatically treated as a boolean property:

```js
'Name::required'
```

Result:

```js
{
  label: 'Name',
  iProps: {
    required: true
  }
}
```

## Examples

### Simple Field
::: code-group

```js [Input]
'Name'
```

```js [Output]
{
  label: 'Name',
}
```

:::

### Password Field

::: code-group

```js [Input]
'Password::password'
```

```js [Output]
{
  label: 'Password',
  iProps: {
    type: 'password'
  }
}
```

:::

### Responsive Grid

::: code-group

```js [Input]
'Name::md6'
```

```js [Output]
{
  label: 'Name',
  colProps: {
    md: '6'
  }
}
```

:::

### Dynamic Props
::: code-group

```js [Input]
'Age::number:min=18:max=99'
```

```js [Output]
{
  label: 'Age',
  component: 'input',
  iProps: {
    type: 'number',
    min: 18,
    max: 99
  }
}
```

:::

### Boolean Flags

::: code-group

```js [Input]
'I Accept the Terms::required:disabled'
```

```js [Output]
{
  label: 'I Accept the Terms',
  iProps: {
    required: true,
    disabled: true
  }
}
```

:::
