import * as React from "react"
import "./Card.scss"

type CardActions = {
    onEdited: F1<Card>
}

const Card: React.FC<Card & CardActions> = ({ id, title, onEdited, listId }) => {
    const [editable, setEditable] = React.useState<boolean>(false)
    const [newTitle, setTitle] = React.useState<string>("")
    const [description, setDescription] = React.useState<string>("")

    return !editable ? (
        <li
            className="Card"
            key={id}
            onClick={() => {
                setEditable(true)
                setTitle(title)
            }}>
            <div className="Card__Title">{title}</div>
        </li>
    ) : (
        <>
            <input value={newTitle} onChange={e => setTitle(e.target.value)} />
            <textarea value={description} onChange={e => setDescription(e.target.value)} />
            <button
                disabled={newTitle.length <= 0}
                onClick={() => {
                    onEdited({ id, title: newTitle, description, listId })
                    setEditable(false)
                }}>
                Zapisz
            </button>
        </>
    )
}

export const CardView: React.FC<{ cards: Card[]; onEdited: F1<Card> }> = ({ cards, onEdited }) => (
    <>
        {cards.map(c => (
            <Card key={c.id} {...c} onEdited={onEdited} />
        ))}
    </>
)
