import * as React from "react"
import "./Card.scss"
import { isValidString, CardCreator } from "../models"

type CardActions = {
    onEdited: F1<Card>
}

const Card: React.FC<Card & CardActions> = ({ id, title, onEdited, listId, description }) => {
    const [editingCard, setEditingCard] = React.useState(false)

    const [newTitle, setTitle] = React.useState(title)
    const [newDescription, setNewDescription] = React.useState(description || "")

    return !editingCard ? (
        <li className="Card" key={id} onClick={() => setEditingCard(true)}>
            <div className="Card__Title">{title}</div>
        </li>
    ) : (
        <>
            <input value={newTitle} onChange={e => setTitle(e.target.value)} />
            <textarea value={newDescription} onChange={e => setNewDescription(e.target.value)} />
            <button
                disabled={!isValidString(newTitle, 30)}
                onClick={() => {
                    onEdited(CardCreator(id, newTitle, listId, newDescription))
                    setEditingCard(false)
                }}>
                Zapisz
            </button>
        </>
    )
}

export const CardView: React.FC<{ cards: Card[]; onEdited: F1<Card> }> = ({ cards, onEdited }) =>
    cards.length > 0 ? (
        <ul className="List__Cards">
            {cards.map(c => (
                <Card key={c.id} {...c} onEdited={onEdited} />
            ))}
        </ul>
    ) : null
