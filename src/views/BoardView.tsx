import * as React from "react"
import { connect } from "react-redux"
import { RouteComponentProps, NavLink } from "react-router-dom"
import "./BoardView.scss"
import { AddListButton } from "../components/AddListButton"
import { ListsView } from "../components/List"
import { actions } from "../store/app"
import { ListCreator, CardCreator } from "../models"
import { routes } from "."
import * as shortid from "shortid"

type BoardProps = Board | null

type ActionProps = {
    addList: F1<string>
    addCard: F2<string, string>
    setEditedList: F1<List>
    setEditedCard: F1<Card>
}

const Board: React.FC<(BoardProps) & ActionProps> = p => {
    return p == null ? (
        <h1>Tablica nie istnieje</h1>
    ) : (
        <div className="Board">
            <div className="Board__Header">
                <NavLink className="Header__HomeBtn" to={routes.root}>
                    👈
                </NavLink>
                <h1 className="Header__Title">{p.title}</h1>
            </div>
            <ul className="Board__Lists">
                <ListsView
                    lists={p.lists}
                    cards={p.cards}
                    onCardSubmit={p.addCard}
                    onCardEdited={p.setEditedCard}
                    setEditedList={p.setEditedList}
                />
                <AddListButton onClick={p.addList} />
            </ul>
        </div>
    )
}

type BoardRouteProps = { id: string }
type OwnProps = RouteComponentProps<BoardRouteProps>
const mapState: MapState<BoardProps, OwnProps> = (s, op) => {
    const { id: bId } = op.match.params
    const board = s.app.boards.find(b => b.id === bId)!

    return board ? board : null
}

const mapDispatch: MapDispatch<ActionProps, OwnProps> = (dispatch, op) => {
    const boardId = op.match.params.id
    return {
        addList: title => dispatch(actions.addList({ boardId, list: ListCreator(shortid.generate(), title) })),
        setEditedList: list => dispatch(actions.setEditedList({ boardId, list })),
        addCard: (title, listId) =>
            dispatch(actions.addCard({ boardId, card: CardCreator(shortid.generate(), title, listId) })),
        setEditedCard: card => dispatch(actions.setEditedCard({ boardId, card }))
    }
}
export const BoardView = connect<BoardProps, ActionProps, {}, RootState>(
    mapState,
    mapDispatch
)(Board)
