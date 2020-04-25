describe('List items', () => {
  beforeEach(() => {
    cy.seedAndVisit()
  })

  it('properly displays completed items', () => {
    cy.get('.todo-list li')
      .filter('.completed')
      .should('have.length', 1)
      .and('contain', 'Eggs')
      .find('.toggle')
      .should('be.checked')
  })

  it('Shows reamining todos in the footer', () => {
    cy.get('.todo-count')
      .should('contain', 3)
  })

  it('Removes a todo', () => {
    cy.route({
      url: '/todos/1',
      method: 'DELETE',
      status: 204,
      response: {}
    })

    cy.get('.todo-list li')
      .as('list')
    
    cy.get('@list')
      .first()
      .find('.destroy')
      .invoke('show')
      .click()
    
    cy.get('@list')
      .should('have.length', 3)
      .and('not.contain', 'Milk')
  })

  it.only('Marks an incomplete item complete', () => {
    cy.fixture('todos')
      .then(todos => {
        const target = Cypress._.head(todos)
        cy.route({
          url: `todos/${target.id}`,
          method: 'PUT',
          response: { ...target, completed: true }
        })
      })
    
    cy.get('.todo-list li')
      .first()
      .as('first-todo')
    
    cy.get('@first-todo')
      .find('.toggle')
      .click()
      .should('be.checked')
    
    cy.get('@first-todo')
      .should('have.class', 'completed')
    
    cy.get('.todo-count')
      .should('contain', 2)
  })
})