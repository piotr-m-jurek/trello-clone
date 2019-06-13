import * as React from "react"
import { connect } from "react-redux"

type Props = {
    text: string
}

const Hello: React.FC<Props> = ({ text }) => <h1>{text}</h1>

const mapState: MapState<Props> = s => ({ text: s.board.title })

export const HelloView = connect<Props, {}, {}, RootState>(
    mapState,
    {}
)(Hello)
