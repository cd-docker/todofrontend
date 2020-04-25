describe('Input form', () => {
  beforeEach(() => {
    cy.seedAndVisit([])
  })

  it('focuses input on load', () => {
    cy.focused()
      .should('have.class', 'new-todo')
  })

  it('accepts input', () => {
    const typedText = 'Buy Milk'
    cy.get('.new-todo')
      .type(typedText)
      .should('have.value', typedText)
  })

  context('Form submission', () => {
    it('Adds a new todo on submit', () => {
      const itemText = 'Buy eggs'
      cy.server()
      cy.route('POST', '/todos', {
        title: itemText,
        id: 1,
        completed: false
      })
      cy.get('.new-todo')
        .type(itemText)
        .type('{enter}')
        .should('have.value', '')
      cy.get('.todo-list li')
        .should('have.length', 1)
        .and('contain', itemText)
    })
  })
})