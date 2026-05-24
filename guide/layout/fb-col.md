# O Componente: FbCol
O `<fb-col>` é o componente de coluna que deve sempre estar contido em um `FbRow`. Ele utiliza um sistema de 12 colunas, permitindo divisões precisas e ajustes específicos para diferentes tamanhos de tela (mobile, tablet, desktop).

## Funcionalidades
**Grid de 12 Unidades:** Flexibilidade total para dividir a linha em metades (6), terços (4), quartos (3), etc.

**Breakpoints Responsivos:** Suporte nativo para sm, md, lg e xl.

**Integração Direta com DSL:** Quando você escreve Nome::md6, o core do framework repassa automaticamente o valor 6 para a prop md deste componente.

## Como usar
### Uso Manual
Você pode usar as colunas para criar layouts complexos fora da renderização automática do `form-blocks`:

```html
<fb-row>
  <fb-col cols="12" md="8">Coluna Principal (8/12)</fb-col>
  <fb-col cols="12" md="4">Sidebar (4/12)</fb-col>
</fb-row>
```

### Na DSL (Uso Automático)
A DSL facilita o uso das props do FbCol através de uma sintaxe curta:

```javascript
// 'Label::componente:cols:breakpoint'
'Bio::textarea:12:lg6'
```

No exemplo acima, o framework renderizará um FbCol com:

- `:cols="12"` (Ocupa a linha toda no mobile)

- `:lg="6"` (Ocupa metade da linha em telas grandes)

## Classes Geradas
O componente gera classes dinâmicas baseadas no PREFIX (ex: fb). Se você definir `<fb-col cols="12" md="6">`, as classes aplicadas serão:

`.fb-col:` Classe base com o padding (gutter).

`.fb-col-12:` Define flex: 0 0 100% e max-width: 100%.

`.fb-col-md-6:` Aplica flex: 0 0 50% e max-width: 50% dentro do media query de 768px.

## Dica de Grid
Se você não definir nenhuma largura (cols ou breakpoints), o comportamento padrão dependerá do CSS do seu design system (geralmente ocupando 100% da largura ou comportando-se como flex-grow). Para garantir consistência nos formulários, sempre defina ao menos a largura base ou o breakpoint `md`.

## Backdoor
### Props

| Prop | Tipo | Default | Descrição |
|------|:----:|-------------|-----------|
| cols | String\|Number | null | Largura base (mobile-first). Ex: 12. |
| tag | String | 'div' | A tag HTML da coluna. |
| sm | String\|Number | null | Largura em telas Pequenas (Small). |
| md | String\|Number | null | Largura em telas Médias (Medium). |
| lg | String\|Number | null | Largura em telas Grandes (Large). |
| xl | String\|Number | null | Largura em telas Extra Grandes (Extra Large). |