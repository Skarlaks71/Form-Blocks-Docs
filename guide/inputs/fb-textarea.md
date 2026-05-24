# O Componente: FbTextarea
O `<fb-textarea>` é um componente projetado para a inserção de textos longos e multilinha. Ele estende a tag HTML `<textarea>` nativa, adicionando um sistema inteligente de redimensionamento automático de altura (Auto-Grow), limites de segurança por linha, formatação em tempo de execução (Lazy ou imediata) e estados de validação.

## Funcionalidades
- **Auto-Grow Inteligente:** Expande e contrai verticalmente sua altura de forma automática enquanto o usuário digita, eliminando barras de rolagem desnecessárias.

- **Teto de Altura (maxRows):** Permite delimitar a quantidade máxima de linhas de expansão. Ao atingir o limite, o componente ativa suavemente o comportamento de scroll interno.

- **Formatação Flexível (Lazy Formatter):** Suporta o processamento do texto inserido instantaneamente ou apenas quando o campo perde o foco (change), reduzindo custos desnecessários de processamento em textos longos.

- **Herança e Bloqueio de Redimensionamento:** Preserva todos os atributos nativos e oferece a `flag noResize` para travar o controle manual de cantos do navegador, garantindo a integridade do layout.

## Como usar
### Uso Básico com Auto-Grow Nativo
Por padrão, o componente já calcula a altura necessária com base no texto inserido, sem precisar de configurações complexas.

```vue
<fb-textarea 
  v-model="comentario" 
  placeholder="Deixe sua opinião sobre o produto..." 
/>
```

### Delimitando Expansão Máxima (maxRows e noResize)
Para manter o controle estético do design de suas telas e impedir que o usuário quebre o layout esticando o bloco manualmente:

```vue
<fb-textarea 
  v-model="biografia" 
  :rows="3"
  :max-rows="6"
  no-resize
  placeholder="Fale um pouco sobre você (Máx. 6 linhas)..." 
/>
```

### Otimização com Formatação Tardia (lazy-formatter)
Processar strings muito longas a cada tecla digitada pode causar lentidão na interface (UI Lag). Ativar a propriedade `lazy-formatter` garante que a limpeza ou tratamento do texto aconteça apenas no momento em que o usuário terminar a edição (evento `blur/change`):

```vue
<script setup>
// Remove espaços extras consecutivos e limpa pontas da string
const cleanTextFormatter = (value) => value.replace(/\s+/g, ' ').trim()
</script>

<template>
  <fb-textarea 
    v-model="artigoTexto" 
    :formatter="cleanTextFormatter" 
    lazy-formatter
    placeholder="Escreva seu artigo aqui..." 
  />
</template>
```

## Classes e Customização CSS
A marcação emite estilos padronizados utilizando as convenções globais do framework:

`.fb-textarea:` A classe base injetada diretamente no elemento `<textarea>`.

`.fb-textarea--valid:` Ativada caso `:state="true"`. Modifica bordas e sombras para indicar sucesso.

`.fb-textarea--invalid:` Ativada caso `:state="false"`. Modifica a cor do elemento para indicar erro de preenchimento.

`.fb-textarea--no-resize:` Aplica a regra CSS `resize: none;` para bloquear o redimensionamento nativo.

## Lógica sob o Capô: O Ciclo do Auto-Grow
O `FbTextarea` manipula as propriedades físicas de scroll do DOM para saber o tamanho exato do texto do usuário. No momento do input (e também ao carregar dados de forma assíncrona monitorados via watch), o componente executa os seguintes passos:

1. O framework limpa temporariamente o estilo de altura forçando-o para auto (se `noAutoShrink` for **falso**), permitindo que o elemento descubra sua menor altura real possível.

2. Ele calcula o `scrollHeight` (a altura interna total de rolagem do conteúdo).

3. Caso o `scrollHeight` ultrapasse o cálculo estimado do `maxRows` (baseado em um multiplicador de `line-height`), o componente trava a altura no teto configurado e altera o fluxo para `overflow-y: scroll`. Caso contrário, ele expande perfeitamente o elemento e oculta a barra de rolagem (`overflow-y: hidden`).

Tudo isso acontece encapsulado em um ciclo de `nextTick` do Vue, garantindo que a tela nunca sofra piscadas visuais (_**flickering**_) durante a digitação.

## Backdoor
### Props

| Prop | Tipo | Default | Descrição |
|------|:----:|-------------|-----------|
|modelValue|String\|Number|''|O valor textual vinculado ao componente (suporta v-model).|
|formatter|Function|null|Função executada para modificar ou processar a string inserida pelo usuário.|
|lazyFormatter|Boolean|false|Se **true**, a função formatter só será executada no evento de change (quando o usuário desfoca o campo).|
|rows|String\|Number|2|Altura inicial do campo baseada na quantidade estimada de linhas.|
|maxRows|String\|Number|null|Limite máximo de linhas que o campo pode expandir antes de ativar a barra de rolagem.|
|noResize|Boolean|false|Desativa o handle nativo do navegador que permite o usuário arrastar e redimensionar o campo.|
|noAutoShrink|Boolean|false|Se true, impede que o componente diminua de tamanho caso o usuário apague o texto.|
|state|Boolean\|null|null|Estado de validação do campo: true (válido), false (inválido).|
|wrap|String|'soft'|Comportamento de quebra de linha nativo do HTML ('soft' ou 'hard').|
|limt|Number\|String|null|Mapeia diretamente o atributo nativo maxlength no elemento.|
