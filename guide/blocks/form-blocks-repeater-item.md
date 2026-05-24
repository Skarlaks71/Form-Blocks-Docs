# O Componente: FormBlocksRepeaterItem
O `<form-blocks-repeater-item>` é o componente responsável por renderizar uma única linha (ou instância) dentro de um grupo repetidor. Ele atua como um mediador entre o array de dados do repetidor e os inputs individuais.

## Responsabilidades Principais
1. Isolamento de Escopo: Transforma o objeto de dados da linha atual em uma ref reativa, garantindo que as alterações em um item não afetem os outros de forma inesperada.

2. Identificação Única (IDs Dinâmicos): Gera IDs exclusivos para cada input da linha, permitindo que as tags `<label>` funcionem corretamente (acessibilidade) mesmo que o mesmo formulário apareça várias vezes na página.

3. Mapeamento de Erros: Cruza as chaves de erro globais com os campos específicos daquela instância.

4. Resolução de Design System: Consulta o `Registry` para entender as capacidades de cada componente (como o suporte ao atributo `label-for`).

## Lógica de Identificação Única
Para evitar colisões de ID no DOM, o componente gera chaves seguindo o padrão:
`fb-{uid}-{index}-{model}`

Isso garante que, se você tiver dois repetidores de "Telefone" na mesma tela, o input do "Telefone 1" do primeiro bloco não seja ativado ao clicar no label do "Telefone 1" do segundo bloco.

## Slots e Extensibilidade
Assim como no componente de grupo principal, o `FormBlocksRepeaterItem` respeita a hierarquia de slots. Você pode customizar um input específico apenas dentro do repetidor:

```vue
<form-blocks v-model="formData" :groups="groups">
  <!-- Customizando o input de 'valor' apenas quando ele estiver dentro de um repetidor -->
  <template #input(valor)="{ input, index }">
    <div class="custom-repeater-field">
      <input v-model="formData.contacts[index].value" />
      <span>Índice da linha: {{ index }}</span>
    </div>
  </template>
</form-blocks>
```

## Funcionamento do Render
O componente utiliza o `FbInputBlock` como container para cada campo. Ele injeta automaticamente:

- **Feedback de Erro:** Busca no objeto `errors` injetado se há uma falha para a chave `input.back`.

- **Suporte a Label:** Verifica no `Registry` se o componente destino suporta a prop `labelFor`. Se não (como em alguns componentes de terceiros), ele desativa o link automático para evitar erros de console.

- **Encapsulamento de Grid:** Aplica as `colProps` (definidas na DSL) diretamente na coluna que envolve o campo.

## Observação Técnica
O uso do `toRef(props, 'formData')` dentro do setup é o que permite que o `createInputNode` mantenha a reatividade bidirecional (`v-model`) de forma performática, atualizando o objeto original dentro do array do repetidor pai.

### Seção de Blocos Concluída!
Com isso, documentamos toda a árvore de renderização:

1. **FormBlocks** (Raiz)

2. **FormGroupBlocks** (Layout/Lógica de Grupo)

3. **FormBlocksRepeater** (Orquestrador de Listas)

4. **FormBlocksRepeaterIte**m (Instância da Lista)

5. **FormInputsBlocks** (Átomo do Input)

## Backdoor
### Props

| Prop | Tipo | Default | Descrição |
|------|:----:|:-----------:|-----------|
|forms |Array| []|A lista de definições de campos para esta linha.|
|formData |Object| {}|O objeto de dados específico desta instância no array.|
|uid |String| 'uid'|Identificador único do repetidor pai.|
|index |Number| undefined|A posição (índice) deste item no array global.|
