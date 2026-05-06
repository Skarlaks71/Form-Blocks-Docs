# 🚀 Começando
Bem-vindo ao Form Blocks! Este guia ajudará você a configurar o framework e criar seu primeiro formulário dinâmico em poucos minutos.

# 1. Instalação
O Form Blocks é modular. Para projetos Vue 3, instale o adaptador oficial:
```bash
npm install @form-blocks/vue
```

# 2. Configuração Global
No seu arquivo de entrada principal (geralmente main.js ou main.ts), registre o plugin e importe os estilos base:

```javascript
import { createApp } from 'vue'
import FormBlocks from '@form-blocks/vue'

// Importação obrigatória dos estilos
import '@form-blocks/vue/style.css'

const app = createApp(App)
app.use(FormBlocks)
app.mount('#app')
```

# 3. Conceitos Fundamentais
Antes de codar, entenda os três pilares que você usará:

backVars: Um array de strings que define quais chaves o seu objeto final (v-model) terá.

groupBase: A definição visual e de comportamento de cada campo (Labels, componentes, colunas).

makeGroups: A função "mágica" do core que une a lógica (backVars) com a interface (groupBase).

<hr>

# 4. Seu Primeiro Formulário
Vamos criar um formulário simples de login.

Passo A: Definir a estrutura (useLoginForm.js)
Recomendamos separar a definição do formulário em um composable para manter seu componente limpo.

```javascript
export default () => {
  const groupBase = [
    {
      title: 'Acesso ao Sistema',
      forms: [
        'E-mail::email', // DSL: Label e tipo
        'Senha::password'
      ]
    }
  ]

  return { groupBase }
}
```

# Passo B: Implementar no Componente (Login.vue)
```vue
<script setup>
import { ref } from 'vue'
import { useFormHandle } from '@form-blocks/core'
import useLoginForm from './composables/useLoginForm'

// 1. Chaves que serão enviadas para a API
const backVars = ['email', 'password']

// 2. Estado do formulário e erros
const formData = ref({})
const errors = ref({})

// 3. Construção dos blocos
const { groupBase } = useLoginForm()
const { makeGroups } = useFormHandle()
const groups = makeGroups(backVars, groupBase, [2]) // O '2' indica 2 campos no primeiro bloco
</script>

<template>
  <div class="container">
    <form @submit.prevent="console.log(formData)">
      <form-blocks
        v-model="formData"
        :groups="groups"
        :errors="errors"
      />
      <button type="submit">Entrar</button>
    </form>
  </div>
</template>
```

<hr>

# 5. Dicas de Ouro (Pro-Tips)

#### 💡 Usando a DSL para agilizar
Em vez de objetos verbosos, use o formato de string:
'Label::componente:coluna:propriedade=valor'

Exemplo: 'Gênero::radio:md6:inline'

Label: Gênero

Componente: Radio

Grid: md-6 (metade da linha)

Prop: inline

#### 🔁 Campos Repetidores
Para listas dinâmicas (como telefones ou endereços), adicione isRepeater: true ao seu objeto de grupo no groupBase. O Form Blocks cuidará da lógica de adicionar e remover itens automaticamente.

# Próximos Passos
 - Explorando a **DSL** _**(Designed Shorthand Language)**_

 - Personalização de Estilos
