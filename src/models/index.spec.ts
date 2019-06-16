import { Card, ListCreator, isValidString, stringNonEmpty } from "."

describe("models", () => {
    describe("constructor", () => {
        it("returns valid card w optional description", () => {
            const c: Card = {
                id: "1",
                title: "abc",
                listId: "69",
                description: ""
            }
            expect(Card("1", "abc", "69")).toEqual(c)
            expect(Card("1", "abc", "69", "desc")).toEqual({
                ...c,
                description: "desc"
            })
        })
        it("returns list", () => {
            const l: List = { id: "123", title: "sample title" }
            expect(ListCreator("123", "sample title")).toEqual(l)
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
