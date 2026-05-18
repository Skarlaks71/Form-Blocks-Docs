export default () => {
  const groupBase = [
    {
      title: 'Acesso ao Sistema',
      forms: [
        'E-mail::email', // DSL: Label e tipo
        'Senha::password'
      ]
    }
  ]

  return { groupBase }
}