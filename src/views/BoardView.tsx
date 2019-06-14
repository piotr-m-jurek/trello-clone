import * as React from "react"
import { connect } from "react-redux"
import { RouteComponentProps } from "react-router"
import "./Board.scss"
import { AddListButton } from "../components/AddListButton"
import { ListsView } from "../components/List"

type BoardProps = {
    title: string
    lists: List[]
    cards: Card[]
}

const Board: React.FC<BoardProps> = ({ title, lists, cards }) => {
    return (
        <div className="Board">
            <h1 className="Board__Title">{title}</h1>
            <ul className="Board__Lists">
                <ListsView lists={lists} cards={cards} />
                <AddListButton />
            </ul>
        </div>
    )
}

type BoardRouteProps = { id: string }

const mapState: MapState<BoardProps, RouteComponentProps<BoardRouteProps>> = (s, op) => {
    const { id: bId } = op.match.params
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
