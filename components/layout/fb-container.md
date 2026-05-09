# O Componente: FbContainer
O `<fb-container>` é o componente de nível mais alto para organização de layout. Ele centraliza o conteúdo e fornece as margens laterais necessárias para que o grid interno funcione perfeitamente.

## Funcionalidades
- **Centralização Automática:** Mantém o formulário centralizado em telas grandes.

- **Responsividade:** Adapta a largura máxima baseada nos breakpoints do sistema.

- **Modo Fluido:** Permite que o container ocupe 100% da largura disponível em qualquer resolução.

## Como usar
### Uso Padrão
Ideal para formulários centralizados com largura máxima controlada.

```html
<fb-container>
  <!-- Seu formulário aqui -->
</fb-container>
```

### Layout Fluido
Útil quando o formulário está dentro de modais ou sidebars onde você precisa ocupar todo o espaço lateral.

```html
<fb-container fluid>
  <form-blocks v-model="formData" :groups="groups" />
</fb-container>
```

### Alterando a Tag Semântica
Para melhorar o SEO ou a acessibilidade, você pode mudar a tag raiz:

```html
<fb-container tag="section">
  <h3>Dados Cadastrais</h3>
</fb-container>
```

## CSS Relacionado
O componente aplica as seguintes classes baseadas no PREFIX configurado:

`.fb-container:` Possui `max-width` variável por breakpoint e `margin-inline: auto`.

`.fb-container-fluid:` Possui `width: 100%` e remove as restrições de `max-width`.

## Dica de Integração
Embora o componente `<form-blocks>` já gerencie suas próprias linhas internas, envolver o componente raiz em um `FbContainer` é a melhor prática para garantir que o layout não "cole" nas bordas da janela do navegador.

## Backdoor
### Props

| Prop | Tipo | Default | Descrição |
|------|:----:|-------------|-----------|
| fluid | Boolean | false | Se true, o container ocupa toda a largura da tela (.fb-container-fluid). |
| tag | String | 'div' | Permite alterar a tag HTML renderizada (ex: section, form, main). |