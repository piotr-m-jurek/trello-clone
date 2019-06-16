import * as React from "react"
import { CardView } from "./Card"
import "./List.scss"

type ListProps = {
    cards: Card[]
    list: List
}
type ListActions = {
    onCardSubmit: F1<string>
    onCardEdited: F1<Card>
}

const ListForm: React.FC<{ onSubmit: F1<string> }> = ({ onSubmit }) => {
    const [input, setInput] = React.useState<string>("")
    return (
        <>
            <input onChange={e => setInput(e.target.value)} value={input} />
            <button disabled={input.length < 0} onClick={() => onSubmit(input)}>
                Dodaj
            </button>
        </>
    )
}

const List: React.FC<ListProps & ListActions> = ({ cards, list, onCardSubmit, onCardEdited }) => {
    const [editable, setEditable] = React.useState<boolean>(false)

    return (
        <li className="List">
            <h2 className="List__Title">{list.title}</h2>
            {cards.length > 0 ? (
                <ul className="List__Cards">
                    <CardView cards={cards} onEdited={onCardEdited} />
                </ul>
            ) : null}
            {!editable ? (
                <button className="List__AddButton" onClick={() => setEditable(true)}>
                    + Dodaj kolejną kartę
                </button>
            ) : (
                <ListForm
                    onSubmit={s => {
                        onCardSubmit(s)
                        setEditable(false)
                    }}
                />
            )}
        </li>
    )
}

type ListViewProps = {
    lists: List[]
    cards: Card[]
    onCardSubmit: F2<string, string>
    onCardEdited: F1<Card>
}

export const ListsView: React.FC<ListViewProps> = ({ lists, cards, onCardSubmit, onCardEdited }) => {
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
                />
            ))}
        </>
    )
}
