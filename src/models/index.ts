export const ListCreator = (id: string, title: string): List => ({ id, title })

export const CardCreator = (id: string, title: string, listId: string, description = ""): Card => ({
    id,
    title,
    listId,
    description
})

export const BoardCreator = (id: string, title: string): Board => ({ id, title, cards: [], lists: [] })

export const stringNonEmpty = (s: string) => typeof s === "string" && s.length > 0
export const isValidString = (s: string, len = 255) => stringNonEmpty(s) && s.length <= len
