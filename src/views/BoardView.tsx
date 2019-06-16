import * as React from "react"
import { connect } from "react-redux"
import { RouteComponentProps, NavLink } from "react-router-dom"
import "./BoardView.scss"
import { AddListButton } from "../components/AddListButton"
import { ListsView } from "../components/List"
import { actions } from "../store/app"
import shortId from "shortid"
import { ListCreator, CardCreator } from "../models"
import { routes } from "."

type BoardProps = {
    title: string
    lists: List[]
    cards: Card[]
}

type ActionProps = {
    addList: F1<string>
    addCard: F2<string, string>
    setEditedList: F1<List>
    setEditedCard: F1<Card>
}

const Board: React.FC<BoardProps & ActionProps> = ({ title, lists, cards, addList, addCard, setEditedCard }) => {
    return (
        <div className="Board">
            <div className="Board__Header">
                <NavLink className="Header__HomeBtn" to={routes.root}>
                    👈
                </NavLink>
                <h1 className="Header__Title">{title}</h1>
            </div>
            <ul className="Board__Lists">
                <ListsView lists={lists} cards={cards} onCardSubmit={addCard} onCardEdited={setEditedCard} />
                <AddListButton onClick={addList} />
            </ul>
        </div>
    )
}

type BoardRouteProps = { id: string }
type OwnProps = RouteComponentProps<BoardRouteProps>
const mapState: MapState<BoardProps, OwnProps> = (s, op) => {
    const { id: bId } = op.match.params
    const { title, lists, cards } = s.app.boards[+bId]

    return {
        title,
        lists,
        cards
    }
}

const mapDispatch: MapDispatch<ActionProps, OwnProps> = (dispatch, op) => {
    const boardId = op.match.params.id
    return {
        addList: title => dispatch(actions.addList({ boardId, list: ListCreator(shortId.generate(), title) })),
        setEditedList: list => dispatch(actions.setEditedList({ boardId, list })),
        addCard: (title, listId) =>
            dispatch(actions.addCard({ boardId, card: CardCreator(shortId.generate(), title, listId) })),
        setEditedCard: card => dispatch(actions.setEditedCard({ boardId, card }))
    }
}
export const BoardView = connect<BoardProps, ActionProps, {}, RootState>(
    mapState,
    mapDispatch
)(Board)
