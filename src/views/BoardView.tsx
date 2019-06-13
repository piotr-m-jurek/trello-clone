import * as React from "react"
import { connect } from "react-redux"

type BoardProps = {
    title: string
    lists: List[]
    cards: Card[]
}

const Board: React.FC<BoardProps> = ({ ...p }) => <>{JSON.stringify(p, null, 4)}</>

const mapState: MapState<BoardProps> = s => {
    // tslint:disable-next-line: no-console
    console.log({ ...s })
    const { title, lists, cards } = s.board
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
