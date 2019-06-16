import * as React from "react"

export const AddListButton: React.FC<{ onClick: F1<string> }> = ({ onClick }) => {
    const [editable, setEditable] = React.useState<boolean>(false)
    const [input, setInput] = React.useState<string>("")

    const isListValid = input.length > 0 && input.length <= 30

    return !editable ? (
        <button
            className="List__AddList"
            onClick={() => {
                setEditable(true)
            }}>
            + Dodaj kolejną listę
        </button>
    ) : (
        <>
            <input type="text" onChange={e => setInput(e.target.value)} />
            <button
                disabled={!isListValid}
                onClick={() => {
                    onClick(input)
                }}>
                Add
            </button>
        </>
    )
}
