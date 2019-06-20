import * as React from "react"
import { NewCardForm } from "./List"
import { shallow } from "enzyme"

describe("NewCardForm", () => {
    it("resets input after edition", async () => {
        // tslint:disable-next-line:no-console
        const form = shallow(<NewCardForm onSubmit={s => console.log(s)} />)
        form.find(".List__AddButton").simulate("click")
        const input = () => form.find("input")

        const value = "test 1"
        input().simulate("change", { target: { value } })
        expect(input().props().value).toEqual(value)
        form.find("button").simulate("click")
        form.find(".List__AddButton").simulate("click")
        expect(input().props().value).toEqual("")
    })
})
