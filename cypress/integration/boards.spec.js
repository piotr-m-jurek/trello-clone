
describe("board selection", () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:4444')

    })
    it("visits main page", () => {
        cy.get('.Main__Title').should('exist')
        cy.get('.Main__Boards').children().should('have.length', 3)
    })
    it("opens first board", () => {
        cy.get('.Main__Boards').children().first().click()
        cy.get('.Board__Header .Header__Title').should('have.text', 'KG Board')
    })
})
