import * as React from "react"

type Props = {
    text: string
}

export const NoMatch: React.FC<Props> = ({ text }) => <h1>{text}</h1>
