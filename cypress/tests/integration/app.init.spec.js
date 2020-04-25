describe('App initialization', () => {
    it('Loads todo on page load', () => {
        cy.seedAndVisit()

        cy.get('.todo-list li')
          .should('have.length', 4)
    })
})