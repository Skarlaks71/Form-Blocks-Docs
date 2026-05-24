# O Componente: FbRow
O `<fb-row>` cria um contexto de linha flexível para o sistema de grid. Ele é projetado para conter componentes `FbCol`, garantindo que os campos do formulário fiquem corretamente alinhados e respeitem os espaçamentos (gutters) definidos no design system.

## Funcionalidades
- **Flexbox Layout:** Utiliza `display: flex` com suporte a quebra de linha (`flex-wrap`).

- **Gestão de Espaçamento:** Aplica margens negativas para compensar o padding das colunas, mantendo o alinhamento perfeito com o container.

- **Controle de Gutters:** Permite remover completamente os espaços entre as colunas quando necessário.

## Como usar
### Uso Básico
No Form Blocks, o `FbRow` é usado internamente em cada grupo de campos, mas você também pode usá-lo manualmente para layouts customizados:

```html
<fb-row>
  <fb-col md="6">Campo A</fb-col>
  <fb-col md="6">Campo B</fb-col>
</fb-row>
```

### Sem Espaçamento (No Gutters)
Ideal para quando você precisa que os campos fiquem "encostados" uns nos outros, como em um grupo de botões ou um campo de busca com anexo.

```html
<fb-row no-gutters>
  <fb-col>Campo grudado no outro</fb-col>
</fb-row>
```

## CSS Relacionado
As classes aplicadas seguem o padrão de prefixo do framework:

`.fb-row:` Define `display: flex, flex-wrap: wrap` e as margens negativas de compensação.

`.fb-no-gutters:` Remove as margens da linha e zera o padding de qualquer `.fb-col` que esteja dentro dela.

## Comportamento Interno e DSL
O `FbRow` é o componente que recebe as animações de transição (fade) quando um grupo inteiro de campos é exibido ou escondido através da propriedade dependent. Além disso, ele gerencia automaticamente a margem superior para separar visualmente diferentes grupos de formulários.

## Backdoor
### Props

| Prop | Tipo | Default | Descrição |
|------|:----:|-------------|-----------|
| noGutters | Boolean | false | Se true, remove as margens negativas da linha e os paddings das colunas filhas. |
| tag | String | 'div' | Define a tag HTML da linha (ex: section, ul). |