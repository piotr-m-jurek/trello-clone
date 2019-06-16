import * as React from "react"

export const AddListButton: React.FC<{ onClick: F1<string> }> = ({ onClick }) => {
    const [listEditing, setListEditing] = React.useState(false)
    const [listTitle, setListTitle] = React.useState("")

    const isListValid = listTitle.length > 0 && listTitle.length <= 30

    return !listEditing ? (
        <button
            className="List__AddList"
            onClick={() => {
                setListEditing(true)
            }}>
            + Dodaj kolejną listę
        </button>
    ) : (
        <>
            <input type="text" onChange={e => setListTitle(e.target.value)} />
            <button
                disabled={!isListValid}
                onClick={() => {
                    onClick(listTitle)
                }}>
                Add
            </button>
        </>
    )
}
