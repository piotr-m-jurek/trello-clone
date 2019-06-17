import * as React from "react"
import { NavLink } from "react-router-dom"
import { routes } from "."
import { connect } from "react-redux"
import "./MainView.scss"
import { BoardCreator } from "../models"
import { actions } from "../store/app"
import shortid = require("shortid")

type MainProps = {
    boards: Board[]
}

type MainActions = {
    createBoard: F1<Board>
}

const Main: React.FC<MainProps & MainActions> = ({ boards, createBoard }) => {
    const [boardTitle, setBoardTitle] = React.useState("")
    const [boardEditing, setBoardEditing] = React.useState(false)

    return (
        <div className="Main">
            <h1 className="Main__Title">Trello-clone</h1>
            <div className="Main__Boards">
                {boards.map(b => (
                    <NavLink className="Tile" key={b.id} to={routes.board(b.id)}>
                        <div className="Tile__Title">{b.title}</div>
                    </NavLink>
                ))}
                {!boardEditing ? (
                    <button className="Tile NewBoard" onClick={() => setBoardEditing(true)}>
                        <div className="NewBoard__Title">+ Dodaj</div>
                    </button>
                ) : (
                    <>
                        <input value={boardTitle} onChange={e => setBoardTitle(e.target.value)} />
                        <button
                            onClick={() => {
                                setBoardEditing(false)
                                createBoard(BoardCreator(shortid.generate(), boardTitle))
                            }}>
                            Stwórz
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

const mapState: MapState<MainProps> = s => ({
    boards: s.app.boards
})

const mapDispatch: MapDispatch<MainActions> = dispatch => ({
    createBoard: board => dispatch(actions.createBoard(board))
})

export const MainView = connect<MainProps>(
    mapState,
    mapDispatch
)(Main)
