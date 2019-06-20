import * as React from "react"
import { CardView } from "./Card"
import "./List.scss"
import { stringNonEmpty } from "../models"

type ListProps = {
    cards: Card[]
    list: List
}
type ListActions = {
    onCardSubmit: F1<string>
    onCardEdited: F1<Card>
    setEditedList: F1<List>
}

export const NewCardForm: React.FC<{ onSubmit: F1<string> }> = ({ onSubmit }) => {
    const [cardTitle, setCardTitle] = React.useState("")
    const [cardEditing, setCardEditing] = React.useState(false)
    return cardEditing ? (
        <>
            <input
                onChange={e => {
                    setCardTitle(e.target.value)
                }}
                value={cardTitle}
            />
            <button
                disabled={!stringNonEmpty(cardTitle)}
                onClick={() => {
                    onSubmit(cardTitle)
                    setCardTitle("")
                    setCardEditing(false)
                }}>
                Dodaj
            </button>
        </>
    ) : (
        <button className="List__AddButton" onClick={() => setCardEditing(true)}>
            + Dodaj kolejną kartę
        </button>
    )
}

const List: React.FC<ListProps & ListActions> = ({ cards, list, onCardSubmit, onCardEdited, setEditedList }) => {
    const [listTitle, setListTitle] = React.useState(list.title)
    const [editingListTitle, setEditingListTitle] = React.useState(false)
    return (
        <li className="List">
            {!editingListTitle ? (
                <h2 className="List__Title" onClick={() => setEditingListTitle(true)}>
                    {list.title}
                </h2>
            ) : (
                <>
                    <input value={listTitle} onChange={e => setListTitle(e.target.value)} />
                    <button
                        onClick={() => {
                            setEditedList({ ...list, title: listTitle })
                            setEditingListTitle(false)
                        }}>
                        Zapisz
                    </button>
                </>
            )}

            <CardView cards={cards} onEdited={onCardEdited} />
            <NewCardForm
                onSubmit={s => {
                    onCardSubmit(s)
                }}
            />
        </li>
    )
}

type ListViewProps = {
    lists: List[]
    cards: Card[]
    onCardSubmit: F2<string, string>
    onCardEdited: F1<Card>
    setEditedList: F1<List>
}

export const ListsView: React.FC<ListViewProps> = ({ lists, cards, onCardSubmit, onCardEdited, setEditedList }) => {
    const matchCardByListId = (colId: string) => (card: Card) => card.listId === colId
    return (
        <>
            {lists.map(l => (
                <List
                    key={l.id}
                    list={l}
                    cards={cards.filter(matchCardByListId(l.id))}
                    onCardSubmit={t => onCardSubmit(t, l.id)}
                    onCardEdited={onCardEdited}
                    setEditedList={setEditedList}
                />
            ))}
        </>
    )
}
