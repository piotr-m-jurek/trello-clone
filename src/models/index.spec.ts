import { CardCreator, ListCreator, isValidString, stringNonEmpty, BoardCreator } from "."
import shortid = require("shortid")

describe("models", () => {
    describe("constructor", () => {
        it("returns valid card w optional description", () => {
            const c: Card = {
                id: shortid.generate(),
                title: "abc",
                listId: "69",
                description: ""
            }
            expect(CardCreator("1", "abc", "69")).toEqual(c)
            expect(CardCreator("abc", "69", "desc")).toEqual({
                ...c,
                description: "desc"
            })
        })
        it("returns list", () => {
            const l: List = { id: shortid.generate(), title: "sample title" }
            expect(ListCreator("sample title")).toEqual(l)
        })

        it("returns board", () => {
            const b: Board = { id: shortid.generate(), lists: [], description: "", cards: [], title: "Test Board" }
            expect(BoardCreator("Test Board")).toEqual(b)
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
