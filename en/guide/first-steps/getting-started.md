<script setup>
import { ref } from 'vue'
import { useFormHandle } from '@form-blocks/core'
import { FbCol, FbButton } from '@form-blocks/vue'
import useLoginForm from '@theme/composables/useLoginForm.js'

// 1. Keys that will be sent to the API
const backVars = ['email', 'password']

// 2. Form state and errors
const formData = ref({})
const errors = ref({})

// 3. Building the blocks
const { groupBase } = useLoginForm()
const { makeGroups } = useFormHandle()
const groups = makeGroups(backVars, groupBase, [2]) // '2' means 2 fields in the first block
</script>

# 🚀 Getting Started

Welcome to Form Blocks! This guide will help you set up the framework and build your first dynamic form in just a few minutes.

## Installation

Form Blocks is modular. For Vue 3 projects, install the official adapter:

```bash
npm install @form-blocks/vue
```

## Global Setup
In your main entry file (usually `main.js` or `main.ts`), register the plugin and import the base styles:

```javascript
import { createApp } from 'vue'
import FormBlocks from '@form-blocks/vue'

// Required style import
import '@form-blocks/vue/style.css'

const app = createApp(App)
app.use(FormBlocks)
app.mount('#app')
```

## Core Concepts
Before coding, understand the three core pillars you'll use:

**backVars:** An array of strings that defines which keys your final object (`v-model`) will contain.

**groupBase:** The visual and behavioral definition of each field (_labels, components, columns_).

**makeGroups:** The core _"magic"_ function that combines the logic (`backVars`) with the interface (`groupBase`).

## Your First Form
Let's create a simple login form.

### Step A: Define the Structure (useLoginForm.js)
We recommend separating the form definition into a composable to keep your component clean.

```javascript
import { defineGroupBase } from "@form-blocks/core"

export default () => {
  const groupBase = defineGroupBase([
    {
      title: 'System Access',
      forms: [
        'E-mail::email', // DSL: Label and type
        'Password::password'
      ]
    }
  ])

  return { groupBase }
}
```

### Step B: Implement It in the Component (Login.vue)
```vue
<script setup>
import { ref } from 'vue'
import { useFormHandle } from '@form-blocks/core'
import { FbButton } from '@form-blocks/vue'
import useLoginForm from './composables/useLoginForm'

// 1. Keys that will be sent to the API
const backVars = ['email', 'password']

// 2. Form state and errors
const formData = ref({})
const errors = ref({})

// 3. Building the blocks
const { groupBase } = useLoginForm()
const { makeGroups } = useFormHandle()
const groups = makeGroups(backVars, groupBase, [2]) // '2' means 2 fields in the first block
</script>

<template>
  <fb-container>
    <form @submit.prevent="console.log(formData)">
      <form-blocks
        v-model="formData"
        :groups="groups"
        :errors="errors"
      />
      <fb-button type="submit">Login</fb-button>
    </form>
  </fb-container>
</template>
```

### Resultado
<div style="margin-top: 1rem; padding: 20px; border: 1px solid var(--vp-c-divider); border-radius: 8px;">
  <fb-container>
    <form @submit.prevent="console.log(formData)">
      <form-blocks
        v-model="formData"
        :groups="groups"
        :errors="errors"
      />
      <fb-button type="submit">Entrar</fb-button>
    </form>
  </fb-container>
</div>

## Pro-Tips

### 💡 Using the DSL to Speed Up Development
Instead of verbose objects, use the string format:
`'Label::componente:coluna:propriedade=valor'`

Example: `'Gênero::radio:md6:inline'`

Meaning:
- Label: Gender
- Component: Radio
- Grid: md-6 (half row width)
- Prop: inline

### Repeater Fields
For dynamic lists (such as phone numbers or addresses), add isRepeater: true to your group object inside groupBase.

## Next Steps
 - Exploring the **DSL** _**(Designed Shorthand Language)**_

 - Style Customization
