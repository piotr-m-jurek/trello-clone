import * as React from "react"
import "./Card.scss"

type CardProps = Pick<Card, "id" | "description" | "title">

const Card: React.FC<CardProps> = ({ id, title }) => {
    const [editable, setEditable] = React.useState<boolean>(false)

    return !editable ? (
        <li className="Card" key={id} onClick={() => setEditable(true)}>
            <div className="Card__Title">{title}</div>
        </li>
    ) : null
}

export const CardView: React.FC<{ cards: Card[] }> = ({ cards }) => (
    <>
        {cards.map(c => (
            <Card key={c.id} {...c} />
        ))}
    </>
)
