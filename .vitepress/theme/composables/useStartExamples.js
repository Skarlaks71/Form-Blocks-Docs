export const groupBasePassword = [
  {
    noTitle: true,
    forms: [
      'Senha::password'
    ]
  }
]

export const groupBaseGrid = [
  {
    noTitle: true,
    forms: [
      'Nome::12:md6'
    ]
  }
]

export const groupBaseIProps = [
  {
    noTitle: true,
    forms: [
      'Idade::number:min=18:max=99'
    ]
  }
]

export const groupBaseFlags = [
  {
    noTitle: true,
    forms: [
      'Bio::disabled:required'
    ]
  }
]

export const groupBaseSelect = [
  {
    noTitle: true,
    forms: [
      [ 'Cidade::select:md6', [ { label: 'Ceará', value: 'CE' }, { label: 'Paraíba', value: 'PB' } ] ]
    ]
  }
]