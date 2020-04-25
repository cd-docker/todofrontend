Cypress.Commands.add('seedAndVisit', (seedData = 'fixture:todos') => {
  cy.server()
  cy.route('GET', '/todos', seedData)
  cy.visit('/')
})