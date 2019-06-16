import { CardCreator, ListCreator, isValidString, stringNonEmpty, BoardCreator } from "."
import shortid = require("shortid")

describe("models", () => {
    describe("constructor", () => {
        it("returns valid card w optional description", () => {
            const id = shortid.generate()
            const c: Card = {
                id,
                title: "abc",
                listId: "69",
                description: ""
            }
            expect(CardCreator(id, "abc", "69")).toEqual(c)
            expect(CardCreator(id, "abc", "69", "desc")).toEqual({
                ...c,
                description: "desc"
            })
        })
        it("returns list", () => {
            const id = shortid.generate()
            const l: List = { id, title: "sample title" }
            expect(ListCreator(id, "sample title")).toEqual(l)
        })

        it("returns board", () => {
            const id = shortid.generate()

            const b: Board = { id, lists: [], cards: [], title: "Test Board" }
            expect(BoardCreator(id, "Test Board")).toEqual(b)
        })
    })
    describe("validators", () => {
        expect(isValidString("")).toBeFalsy()
        expect(isValidString("asdf", 4)).toBeTruthy()
        expect(isValidString("asdf", 4)).toBeTruthy()
        expect(isValidString("asd fgh jkl", 10)).toBeFalsy()

        expect(stringNonEmpty("")).toBeFalsy()
        expect(stringNonEmpty("non-empty")).toBeTruthy()
    })
})
