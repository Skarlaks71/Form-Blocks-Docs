# O Componente: FbInput
O `<fb-input>` é um wrapper inteligente sobre a tag HTML `<input>` nativa. Ele integra-se perfeitamente com o ecossistema do **Form Blocks**, fornecendo suporte integrado para máscaras, contagem de caracteres, formatação dinâmica e estados visuais de validação.

## Funcionalidades
- **Herança Automática:** Qualquer atributo nativo do HTML `(como type="password", placeholder, disabled ou maxlength)` passado para o componente é repassado diretamente para o input interno.

- **Diretivas Dinâmicas:** Aplica as diretivas `v-maska e v-limit-chars` em tempo de execução apenas se as respectivas propriedades forem declaradas.

- **Processamento com Formatters:** Permite interceptar o valor digitado e modificá-lo (ex: forçar caixa alta) antes de atualizar o estado do formulário.

## Como usar
### Uso Básico (com atributos nativos herdados)
Você pode usá-lo passando tipos nativos e placeholders diretamente:

```vue
<fb-input 
  v-model="email" 
  type="email" 
  placeholder="seu@email.com" 
/>
```

### Aplicando Máscaras (mask)
Se o core do seu projeto tiver a diretiva `v-maska` registrada globalmente, você pode injetar máscaras diretamente:

```vue
<fb-input 
  v-model="telefone" 
  mask="'(##) #####-####'" 
  placeholder="(00) 00000-0000" 
/>
```

### Formatando a entrada em tempo real (formatter)
Útil para cenários onde o dado inserido precisa seguir uma regra visual rígida (como transformar o texto em caixa alta):

```html
<script setup>
const upperCaseFormatter = (value) => value.toUpperCase()
</script>

<template>
  <fb-input 
    v-model="placaCarro" 
    :formatter="upperCaseFormatter" 
    placeholder="ABC1D23" 
  />
</template>
```

### Estados de Validação
O componente aplica modificadores BEM na classe de controle conforme o feedback de erro:

```vue
<fb-input v-model="senha" :state="false" type="password" />

<fb-input v-model="usuario" :state="true" />
```

## CSS e Estrutura BEM
O componente gera classes baseadas no prefixo global (padrão fb):

- **.fb-input-block__control**: A classe padrão aplicada ao elemento `<input>`.

- **.fb-input-block__control--valid**: Aplicada quando `:state="true"`. Geralmente exibe uma borda verde ou ícone de sucesso.

- **.fb-input-block__control--invalid**: Aplicada quando `:state="false"`. Geralmente exibe a borda vermelha indicando o erro de validação.

## Detalhes de Implementação (Acessibilidade)
Se você não passar um id via atributos, o componente gera automaticamente um ID randômico estável `(ex: fb-input-a1b2c3d)`. Isso garante que, quando o FbInputBlock renderizar a `<label>`, o atributo `for=""` seja perfeitamente vinculado ao input, respeitando as boas práticas de **acessibilidade (WAI-ARIA)**.

## Backdoor
### Props

| Prop | Tipo | Default | Descrição |
|------|:----:|-------------|-----------|
|modelValue| String\|Number|''|O valor vinculado ao campo (suporta v-model).|
|formatter|Function|undefined|Função executada no evento de input para formatar o valor digitado.|
|state|Boolean\|null|null|Controla as classes de validação: true (válido), false (inválido) ou null (neutro).|
|mask|String\|Object|null|Configuração da máscara utilizando a biblioteca Maska.|
|limit|Number\|String|null|Limite visual ou lógico de caracteres para a diretiva customizada.|