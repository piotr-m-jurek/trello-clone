import * as React from "react"
import { NewCardForm } from "./List"
import { shallow } from "enzyme"

describe("NewCardForm", () => {
    it("resets input after edition", async () => {
        // tslint:disable-next-line:no-console
        const form = shallow(<NewCardForm onSubmit={_ => null} />)
        const value = "test 1"
        const input = () => form.find("input")
        const addButton = () => form.find(".List__AddButton")

        addButton().simulate("click")
        input().simulate("change", { target: { value } })

        expect(input().props().value).toEqual(value)

        form.find("button").simulate("click")
        addButton().simulate("click")

        expect(input().props().value).toEqual("")
    })
})
