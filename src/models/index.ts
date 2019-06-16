import shortid = require("shortid")

export const ListCreator = (title: string): List => ({ id: shortid.generate(), title })

export const CardCreator = (title: string, listId: string, description = ""): Card => ({
    id: shortid.generate(),
    title,
    listId,
    description
})

export const BoardCreator = (title: string): Board => ({ id: shortid.generate(), title, cards: [], lists: [] })

export const stringNonEmpty = (s: string) => typeof s === "string" && s.length > 0
export const isValidString = (s: string, len = 255) => stringNonEmpty(s) && s.length <= len
