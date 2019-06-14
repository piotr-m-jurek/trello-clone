import * as React from "react"
import { connect } from "react-redux"
import { RouteComponentProps } from "react-router"
import "./Board.scss"

type BoardProps = {
    title: string
    lists: List[]
    cards: Card[]
}

type ListProps = {
    list: List
    cards: Card[]
}

type CardProps = Pick<Card, "id" | "description" | "title">

const Board: React.FC<BoardProps> = ({ title, lists, cards }) => {
    const matchCardByListId = (colId: number) => (card: Card) => card.listId === colId

    return (
        <div className="Board">
            <h1 className="Board__Title">{title}</h1>
            <ul className="Board__Lists">
                {lists.map(l => (
                    <List list={l} cards={cards.filter(matchCardByListId(l.id))} />
                ))}
                <button className="List__AddList"> + Dodaj kolejną listę</button>
            </ul>
        </div>
    )
}

const List: React.FC<ListProps> = ({ cards, list }) => (
    <li className="List">
        <h2 className="List__Title">{list.title}</h2>
        <ul className="List__Cards">
            {cards.map(c => (
                <Card {...c} />
            ))}
        </ul>
        <button className="List__AddButton">+ Dodaj kolejną kartę</button>
    </li>
)

const Card: React.FC<CardProps> = ({ id, title }) => (
    <li key={id} className="Card">
        <div className="Card__Title">{title}</div>
    </li>
)

type BoardRouteProps = { id: string }

const mapState: MapState<BoardProps, RouteComponentProps<BoardRouteProps>> = (s, op) => {
    console.log({ s, op })
    const bId = op.match.params.id
    const { title, lists, cards } = s.board.boards[+bId]

    return {
        title,
        lists,
        cards
    }
}

export const BoardView = connect<BoardProps, {}, {}, RootState>(
    mapState,
    {}
)(Board)
