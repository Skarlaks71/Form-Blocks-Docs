# O Componente: FbInputBlock
O `<fb-input-block>` funciona como o container estrutural e de acessibilidade padrão para os controles de formulário. Ele gerencia o ciclo de vida visual e semântico de labels, descrições auxiliares (Help Text) e mensagens de erro de validação.

## Funcionalidades
- **Acessibilidade Nativa (WCAG):** Garante o vínculo semântico correto entre a label e o input interno por meio de IDs gerados automaticamente e do atributo for (ou htmlFor).

- **Injeção via Scoped Slots:** Passa metadados estruturais (`id, state, ariaDescribedby`) de forma inteligente para os componentes filhos aninhados em seu slot padrão.

- **Suporte a Leitores de Tela:** Inclui suporte para labels ocultas (`labelSrOnly`) e asserções em tempo real para erros de validação via `aria-live="assertive"`.

- **Renderização Condicional Semântica:** Altera dinamicamente a tag de encapsulamento da label entre _label_ (para inputs textuais) e _span_ (para blocos complexos como agrupamentos de `Radio/Checkbox`) dependendo do contexto.

## Como usar
1. **Uso Tradicional (Acoplado ao FbInput)**
   
O `FbInputBlock` compartilha suas propriedades reativas e metadados diretamente com os filhos que herdam as propriedades do slot padrão (`slotProps`):

```html
<fb-input-block 
  label="Nome Completo" 
  description="Insira seu nome idêntico ao documento."
>
  <template #default="slotProps">
    <fb-input 
      v-model="usuario" 
      v-bind="slotProps" 
      placeholder="Digite aqui..." 
    />
  </template>
</fb-input-block>
```

2. **Tratamento de Erros e Validação Dinâmica**
   
Ao assumir o estado inválido, o componente ativa um canal de anúncio agressivo para leitores de tela e expõe o erro imediatamente abaixo do bloco:

```html
<fb-input-block 
  label="E-mail corporativo" 
  :state="false"
  invalid-feedback="O endereço fornecido não pertence a uma organização válida."
>
  <template #default="slotProps">
    <fb-input v-model="email" v-bind="slotProps" type="email" />
  </template>
</fb-input-block>
```

3. **Cenários de Múltiplos Elementos (Ex: Checkbox/Radio)**
   
Para grupos de seleção, clicar na label principal do bloco não deve focar o primeiro elemento de forma cega. Passar `:label-for="false"` transforma a label de topo em um elemento `<span>` estrutural seguro, enquanto o `FbCheckbox` gerencia seus próprios identificadores internos de forma limpa:

```html
<fb-input-block label="Escolha seus planos" :label-for="false">
  <template #default="slotProps">
    <fb-checkbox 
      v-model="meusPlanos" 
      name="planos_escolha" 
      multiple 
      v-bind="slotProps"
      :options="[
        { label: 'Plano Básico', value: 'basic' },
        { label: 'Plano Premium', value: 'premium' }
      ]"
    />
  </template>
</fb-input-block>
```

## Classes e Estrutura BEM
A folha de estilo deve responder à árvore semântica gerada:

- **.fb-input-block:** O container genérico que envelopa todo o conjunto do campo.

- **.fb-input-block__label:** Aplicado ao elemento de texto do rótulo.

    - **Modificadores:** `--block` (quando renderizado como `<span>`), `--sr-only` (escondido visualmente via regras utilitárias de acessibilidade), `--left, --center, --right`.

- **.fb-input-block__description:** Estilo para o texto pequeno de ajuda (Help Text).

- **.fb-input-block__feedback:** Estilo dedicado ao bloco de erro. Força nativamente `display: block` para garantir compatibilidade com estruturas de utilitários como Bootstrap CSS.

## Engenharia de Acessibilidade Oculta
O grande poder deste componente está na geração dinâmica do atributo `aria-describedby`. Quando o `FbInputBlock` detecta uma descrição ou uma string de erro ativa, ele concatena as referências gerando uma string do tipo: `fb-field-12345__description fb-field-12345__feedback`.

Ao aplicar as propriedades do slot (`v-bind="slotProps"`) no input real, esses IDs são atrelados ao leitor de tela do usuário. Isso significa que, ao focar no campo de digitação, o software de acessibilidade dita automaticamente o rótulo, o texto de ajuda e avisa instantaneamente se há algum erro a ser corrigido antes que o usuário precise enviar o formulário.

## Backdoor
### Props

| Prop | Tipo | Default | Descrição |
|------|:----:|-------------|-----------|
|id|String|'fb-field-[hash]'|Identificador único estável autogerado (pode ser sobrescrito manualmente).|
|label|String|null|O texto do rótulo que será exibido acima ou ao lado do campo.|
|labelAlign|String|'left'|Alinhamento do texto da label: `'left'`, `'center'` ou `'right'`.|
|labelClass|String\|Array\|Object|''|Classes CSS adicionais personalizadas para estilização da label.|
|description|String|null|Texto de ajuda auxiliar (Help Text) para orientar o preenchimento do usuário.|
|descriptionClass|String\|Array\|Object|''|Classes CSS customizadas para a área de descrição.|
|invalidFeedback|String|''|Mensagem de texto explicativa exibida quando o campo assume state: false.|
|state|Boolean\|null|null|Estado de validação do campo: true (válido), false (inválido).|
|labelSrOnly|Boolean|false|Se true, oculta a label visualmente mas a mantém legível para leitores de tela (Screen Readers).|
|labelFor|Boolean\|String|false|Se false, o componente renderiza um `<span>` em vez de um `<label>` para evitar quebra de foco semântico em múltiplos seletores.|