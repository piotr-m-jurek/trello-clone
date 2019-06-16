import * as React from "react"
import { NavLink } from "react-router-dom"
import { routes } from "."
import { connect } from "react-redux"

import "./MainView.scss"

type MainProps = {
    boards: Board[]
}

const Main: React.FC<MainProps> = ({ boards }) => (
    <div className="Main">
        <h1 className="Main__Title">Trello-clone</h1>
        <div className="Main__Boards">
            {boards.map(b => (
                <NavLink className="Tile" key={b.id} to={routes.board(b.id)}>
                    <div className="Tile__Title">{b.title}</div>
                </NavLink>
            ))}
        </div>
    </div>
)

const mapState: MapState<MainProps> = s => ({
    boards: s.app.boards
})

export const MainView = connect<MainProps>(
    mapState,
    {}
)(Main)
