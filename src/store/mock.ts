const initialLists: List[] = [
    {
        id: 1337,
        title: "To Do"
    },
    {
        id: 69,
        title: "Done"
    }
]

const initialCards: Card[] = [
    {
        id: 12345,
        title: "Flight Check",
        listId: 1337
    },
    {
        id: 123,
        title: "Packaging",
        listId: 1337
    },
    {
        id: 987,
        title: "Meme watching",
        listId: 69
    }
]

export const boards: Board[] = [
    {
        id: 1,
        title: "KG Board",
        lists: initialLists,
        cards: initialCards
    }
]
