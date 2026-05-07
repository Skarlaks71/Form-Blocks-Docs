# O Componente: FormBlocksRepeaterItem
O `<form-blocks-repeater-item>` é o componente responsável por renderizar uma única linha (ou instância) dentro de um grupo repetidor. Ele atua como um mediador entre o array de dados do repetidor e os inputs individuais.

## Responsabilidades Principais
1. Isolamento de Escopo: Transforma o objeto de dados da linha atual em uma ref reativa, garantindo que as alterações em um item não afetem os outros de forma inesperada.

2. Identificação Única (IDs Dinâmicos): Gera IDs exclusivos para cada input da linha, permitindo que as tags <label> funcionem corretamente (acessibilidade) mesmo que o mesmo formulário apareça várias vezes na página.

3. Mapeamento de Erros: Cruza as chaves de erro globais com os campos específicos daquela instância.

4. Resolução de Design System: Consulta o Registry para entender as capacidades de cada componente (como o suporte ao atributo label-for).