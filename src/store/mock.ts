const initialLists: List[] = [
    {
        id: 1337,
        title: "To Do"
    }
]

const initialCards: Card[] = [
    {
        id: 12345,
        title: "Flight Check",
        listId: 1337
    }
]

export const board: Board = {
    id: 1,
    title: "KG Board",
    lists: initialLists,
    cards: initialCards
}
