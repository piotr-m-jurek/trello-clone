import * as React from "react"
import { CardView } from "./Card"
import "./List.scss"

type ListProps = {
    cards: Card[]
    list: List
}

const List: React.FC<ListProps> = ({ cards, list }) => (
    <li className="List">
        <h2 className="List__Title">{list.title}</h2>
        <ul className="List__Cards">
            <CardView cards={cards} />
        </ul>
        <button className="List__AddButton">+ Dodaj kolejną kartę</button>
    </li>
)

export const ListsView: React.FC<{ lists: List[]; cards: Card[] }> = ({ lists, cards }) => {
    const matchCardByListId = (colId: number) => (card: Card) => card.listId === colId
    return (
        <>
            {lists.map(l => (
                <List list={l} cards={cards.filter(matchCardByListId(l.id))} />
            ))}
        </>
    )
}
