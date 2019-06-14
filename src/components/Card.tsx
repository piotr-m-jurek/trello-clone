import * as React from "react"
import "./Card.scss"

type CardProps = Pick<Card, "id" | "description" | "title">

const Card: React.FC<CardProps> = ({ id, title }) => (
    <li key={id} className="Card">
        <div className="Card__Title">{title}</div>
    </li>
)

export const CardView: React.FC<{ cards: Card[] }> = ({ cards }) => (
    <>
        {cards.map(c => (
            <Card {...c} />
        ))}
    </>
)
