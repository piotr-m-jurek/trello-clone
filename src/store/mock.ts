const initialLists: List[] = [
    {
        id: '1337',
        title: "To Do"
    },
    { id: '12', title: "In Progress" },
    {
        id: '69',
        title: "Done"
    }
]

const initialCards: Card[] = [
    {
        id: '12345',
        title: "Flight Check",
        listId: '1337'
    },
    {
        id: '123',
        title: "Packing",
        listId: '1337'
    },
    {
        id: '987',
        title: "Meme watching",
        listId: '69'
    }
]

export const boards: Board[] = [
    {
        id: '0',
        title: "KG Board",
        lists: initialLists,
        cards: initialCards
    }
]
