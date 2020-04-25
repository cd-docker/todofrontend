describe('Todo tests', () => {
  const url = Cypress.env('API_URL') || 'http://localhost:3030/todos'
  
  beforeEach(() => {
    cy.request('GET', url)
      .its('body')
      .each(todo => cy.request('DELETE', `${url}/${todo.id}`))
  })

  context('With no todos', () => {
    it('Saves new todos', () => {
      const items = [
        {title: 'Buy milk', expectedLength: 1},
        {title: 'Buy eggs', expectedLength: 2},
        {title: 'Buy bread', expectedLength: 3}
      ]

      cy.visit('/')
      cy.server()
      cy.route('POST', url)
        .as('create')
      
      cy.wrap(items)
        .each(todo => {
          cy.focused()
            .type(todo.title)
            .type('{enter}')
          
          cy.wait('@create')
          
          cy.get('.todo-list li')
            .should('have.length', todo.expectedLength)
        })
    })
  })

  context('With active todos', () => {
    beforeEach(() => {
      cy.fixture('todos')
        .each(todo => {
          const newTodo = Cypress._.merge(todo, {completed: false})
          cy.request('POST', url, newTodo)
        })
      cy.visit('/')
    })

    it('Loads existing data from the DB', () => {
      cy.get('.todo-list li')
        .should('have.length', 4)
    })

    it('Deletes todos', () => {
      cy.server()
      cy.route('DELETE', `${url}/*`)
        .as('delete')
      
      cy.get('.todo-list li')
        .each(e => {
          cy.wrap(e)
            .find('.destroy')
            .invoke('show')
            .click()
          
          cy.wait('@delete')
        })
        .should('not.exist')
    })

    it('Toggles todos', () => {
      const clickAndWait = e => {
        cy.wrap(e)
          .as('item')
          .find('.toggle')
          .click()
    
        cy.wait('@update')
      }
      cy.server()
      cy.route('PUT', `${url}/*`)
        .as('update')
      
      cy.get('.todo-list li')
        .each(e => {
          clickAndWait(e)
          cy.get('@item')
            .should('have.class', 'completed')
        })
        .each(e => {
          clickAndWait(e)
          cy.get('@item')
            .should('not.have.class', 'completed')
        })
    })
  })
})