import * as React from "react"
import { connect } from "react-redux"
import { RouteComponentProps } from "react-router"
import "./BoardView.scss"
import { AddListButton } from "../components/AddListButton"
import { ListsView } from "../components/List"
import { actions } from "../store/board"
import shortId from "shortid"
import { EmptyList, Card } from "../models"

type BoardProps = {
    title: string
    lists: List[]
    cards: Card[]
}

type ActionProps = {
    addList: F1<string>
    addCard: F2<string, string>
    setEditedList: F1<List>
}

const Board: React.FC<BoardProps & ActionProps> = ({ title, lists, cards, addList, addCard }) => {
    return (
        <div className="Board">
            <h1 className="Board__Title">{title}</h1>
            <ul className="Board__Lists">
                <ListsView lists={lists} cards={cards} onCardSubmit={addCard} />
                <AddListButton onClick={addList} />
            </ul>
        </div>
    )
}

type BoardRouteProps = { id: string }
type OwnProps = RouteComponentProps<BoardRouteProps>
const mapState: MapState<BoardProps, OwnProps> = (s, op) => {
    const { id: bId } = op.match.params
    const { title, lists, cards } = s.board.boards[+bId]

    return {
        title,
        lists,
        cards
    }
}

const mapDispatch: MapDispatch<ActionProps, OwnProps> = (dispatch, op) => {
    const boardId = op.match.params.id
    return {
        addList: title => dispatch(actions.addList({ boardId, list: EmptyList(shortId.generate(), title) })),
        setEditedList: list => dispatch(actions.setEditedList({ boardId, list })),
        addCard: (title, listId) =>
            dispatch(actions.addCard({ boardId, card: Card(shortId.generate(), title, listId) }))
    }
}
export const BoardView = connect<BoardProps, ActionProps, {}, RootState>(
    mapState,
    mapDispatch
)(Board)
