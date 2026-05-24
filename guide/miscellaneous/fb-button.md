<script setup>
import { FbButton, FbCol, FbRow } from '@form-blocks/vue'
</script>

# O Componente: FbButton
O `<fb-button>` é o componente de ação padrão do ecossistema Form Blocks. Ele abstrai o elemento HTML `<button>` nativo e encapsula o gerenciamento de estados críticos de carregamento (_loading_), bloqueios de segurança contra duplo clique, variações anatômicas (*pílula, círculo, bloco plano*) e tratamentos estéticos de textura.

<div style="padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
    <fb-button label="Clique Aqui 🚀" />
</div>


## Funcionalidades
- **Proteção contra Duplo Envio:** Bloqueia automaticamente o evento de clique e desabilita o elemento no DOM caso a propriedade `loading` ou `disabled` esteja ativa.

- **Hierarquia de Conteúdo:** Aceita a renderização simples via propriedade label ou personalizações ricas (com ícones e marcações complexas) através do seu slot padrão.

- **Variantes Geométricas:** Suporta modificadores anatômicos rápidos como formato de pílula (pill), formato perfeitamente circular (circle) e botões sem bordas ou relevos (flat).

- **Sistema de Texturas Estéticas:** Traz estilos de acabamento visual acoplados (como o padrão carbon), permitindo também uma versão "limpa" (clean) para que você aplique sua própria estilização CSS do zero.

## Como usar
### Botão de Envio Padrão (Submit)
Para formulários, basta passar o tipo submit. Ele herdará a estilização primary automaticamente:

<div style="padding: 20px; border: 1px solid var(--vp-c-divider); border-radius: 8px; margin-bottom: 16px;">

<fb-button type="submit" variant="complementary" label="Salvar Alterações" />
    
<hr style="margin: 20px 0; border: 0; border-top: 1px solid var(--vp-c-divider);" />

<details style="cursor: pointer;">
        <summary style="font-size: 0.9em; color: var(--vp-c-text-2); font-weight: bold;">Ver Código Fonte</summary>

```vue
<fb-button type="submit" variant="complementary" label="Salvar Alterações" />
```

</details>
</div>

### Tratando Eventos de Clique com Segurança
Você pode escutar o evento `@click` normalmente. Se o botão for desabilitado dinamicamente, a sua função de callback não será disparada:

```vue
<script setup>
const salvando = ref(false)

const enviarFormulario = async () => {
  salvando.value = true
  await api.post('/dados')
  salvando.value = false
}
</script>

<template>
  <fb-button 
    label="Enviar" 
    :loading="salvando" 
    @click="enviarFormulario" 
  />
</template>
```

### Personalização Rica (Usando Slots e Ícones)
Se você precisar colocar um ícone ao lado do texto, ignore a propriedade `label` e use o corpo do componente (`slot default`):

```html
<fb-button variant="success">
  <i class="fa fa-check"></i>
  <span>Confirmar Compra</span>
</fb-button>
```

### Variantes Anatômicas (pill, circle, flat)
Perfeito para construir interfaces dinâmicas, barras de ferramentas ou botões de fechar modais:

<div style="padding: 20px; border: 1px solid var(--vp-c-divider); border-radius: 8px; margin-bottom: 16px;">
<fb-row>
    <fb-col cols="4">
        <fb-button label="Assinar Agora" pill variant="warning" />
    </fb-col>
    <fb-col cols="2">
        <fb-button circle variant="danger">
            X
        </fb-button>
    </fb-col>
    <fb-col cols="4">
        <fb-button label="Cancelar" flat />
    </fb-col>
</fb-row>
    
<hr style="margin: 20px 0; border: 0; border-top: 1px solid var(--vp-c-divider);" />

<details style="cursor: pointer;">
    <summary style="font-size: 0.9em; color: var(--vp-c-text-2); font-weight: bold;">Ver Código Fonte</summary>

```html
<fb-button label="Assinar Agora" pill variant="warning" />

<fb-button circle variant="danger">
  <i class="fa fa-trash"></i>
</fb-button>

<fb-button label="Cancelar" flat />
```

</details>
</div>

## Classes e Estrutura BEM
A árvore de renderização do componente gera as seguintes classes baseadas no prefixo global:

`.fb-button:` A classe base aplicada à tag `<button>`.

  - **Modificadores de Estado:** _--disabled, --loading_.

  - **Modificadores de Anatomia:** _--pill, --circle, --flat_.

  - **Modificadores Temáticos:** _--[variant] (ex: --primary, --success) e --texture-[name] (ex: --texture-carbon, --clean)_.

`.fb-button__loader:` O elemento `<span>` injetado dinamicamente para estilizar o indicador de rotação (spinner) quando loading for verdadeiro.

`.fb-button__content:` O container `<span>` que envelopa o texto ou os elementos passados pelo slot, garantindo o alinhamento correto via Flexbox/Grid no CSS.

## Sistema de Texturas Dinâmicas (texture)
Um dos maiores diferenciais estéticos do FbButton é o seu motor de texturas baseado em máscaras CSS (mask-image). Em vez de usar imagens estáticas ou gradientes pesados, o framework utiliza vetores SVG nativos ultra-leves que se repetem infinitamente.

Como a textura atua como uma máscara de opacidade, ela herda e reage automaticamente à cor de fundo definida na propriedade variant.

<div style="padding: 20px; border: 1px solid var(--vp-c-divider); border-radius: 8px; margin-bottom: 16px;">
<fb-row>
    <fb-col cols="3">
        <fb-button variant="danger" texture="stripes" label="Stripes" />
    </fb-col>
    <fb-col cols="3">
        <fb-button variant="success" texture="waves" label="Waves" />
    </fb-col>
    <fb-col cols="3">
        <fb-button variant="primary" label="Carbon" />
    </fb-col>
    <fb-col cols="3">
        <fb-button variant="complementary" texture="grid" label="grid" />
    </fb-col>
</fb-row>
    
<hr style="margin: 20px 0; border: 0; border-top: 1px solid var(--vp-c-divider);" />

<details style="cursor: pointer;">
    <summary style="font-size: 0.9em; color: var(--vp-c-text-2); font-weight: bold;">Ver Código Fonte</summary>

```html
<fb-row>
    <fb-col cols="3">
        <fb-button variant="danger" texture="stripes" label="Stripes" />
    </fb-col>
    <fb-col cols="3">
        <fb-button variant="success" texture="waves" label="Waves" />
    </fb-col>
    <fb-col cols="3">
        <fb-button variant="primary" label="Carbon" />
    </fb-col>
    <fb-col cols="3">
        <fb-button variant="complementary" texture="grid" label="grid" />
    </fb-col>
</fb-row>
```

</details>
</div>

### Variações Disponíveis
O framework disponibiliza 4 padrões geométricos construídos via SCSS Mixins. Você pode alternar entre eles passando o nome correspondente na prop texture:
|Valor|Estilo Visual|Recomendação|
|-----|-------------|------------|
|"carbon"|Padrão geométrico entrelaçado micrométrico (estilo fibra de carbono).|**Padrão do Framework.** Excelente para botões principais que precisam de um visual robusto e moderno.|
|"stripes"|Linhas diagonais paralelas inclinadas em 45°.|Perfeito para botões de alerta, ações destrutivas ou estados de atenção.|
|"grid"|Malha quadriculada técnica e minimalista (Estilo Pine).|Ótimo para interfaces de dashboards, ferramentas analíticas ou temas técnicos.|
|"waves"|Ondulações orgânicas e fluidas sequenciais.|Ideal para interfaces criativas, interações leves ou temas mais descontraídos.|

### Removendo Texturas (clean)
Se você preferir um visual minimalista Flat, sem nenhum tipo de relevo ou textura nas ações, basta ativar a flag clean. Ela limpa os mixins de máscara e deixa a cor da variante totalmente lisa:

<div style="padding: 20px; border: 1px solid var(--vp-c-divider); border-radius: 8px; margin-bottom: 16px;">
<fb-button variant="complementary" clean label="Botão sem textura" />
    
<hr style="margin: 20px 0; border: 0; border-top: 1px solid var(--vp-c-divider);" />

<details style="cursor: pointer;">
    <summary style="font-size: 0.9em; color: var(--vp-c-text-2); font-weight: bold;">Ver Código Fonte</summary>

```vue
<fb-button variant="complementary" clean label="Botão sem textura" />
```

</details>
</div>

::: tip
**💡 Nota de Performance:** Por utilizarem strings de SVG otimizadas direto no código, essas texturas geram zero requisições HTTP adicionais para o servidor, garantindo que o carregamento visual do formulário aconteça a 60fps de forma instantânea.
:::

## Lógica de Curto-Circuito
O componente implementa uma verificação em duas camadas para o bloqueio de ações. No bloco setup, a constante isDisabled é computada avaliando se `props.disabled || props.loading` é verdadeiro.

Essa propriedade não apenas aplica a classe CSS `--disabled` e injeta o atributo nativo disabled no HTML, mas também serve como um curto-circuito na função `handleClick`:

```javascript
const handleClick = (e) => {
  if (isDisabled.value) return // Bloqueio em nível de JavaScript
  emit('click', e)
}
```

Isso garante imunidade contra usuários que tentam inspecionar o código e remover o atributo disabled pelo console do navegador para tentar reenviar requisições maliciosas.

## Backdoor
### Props

| Prop | Tipo | Default | Descrição |
|------|:----:|-------------|-----------|
|label|String|''|O texto que será exibido dentro do botão (ignorado se o slot default for usado).|
|type|String|'button'|O atributo type nativo do HTML: 'button', 'submit' ou 'reset'.|
|variant|String|'primary'|A variação de cor temática do botão (ex: primary, success, danger).|
|texture|String|'carbon'|O padrão de textura/acabamento visual aplicado ao botão (padrão: carbon, stripes, waves, grid).|
|clean|Boolean|false|Se **true**, remove as texturas pré-definidas, facilitando estilizações customizadas.|
|loading|Boolean|false|Ativa o estado de carregamento. Exibe um indicador visual (spinner) e bloqueia novos cliques.|
|disabled|Boolean|false|Desabilita a interação com o botão.|
|pill|Boolean|false|Aplica cantos totalmente arredondados no estilo pílula.|
|circle|Boolean|false|Força proporções perfeitamente quadradas/circulares (excelente para botões de ícone único).|
|flat|Boolean|false|Remove fundos e bordas pesadas, transformando-o em um botão minimalista/textual.|