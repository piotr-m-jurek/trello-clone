import { LoopReducer } from "redux-loop"
import { createAction } from "../utils/typedActions"
import { boards } from "./mock"
import { extend } from "../utils/store"

/* ACTIONS */
export const actions = {
    addList: ({ boardId, list }: { boardId: string; list: List }) => createAction("addList", { boardId, list }),
    setEditedList: ({ boardId, list }: { boardId: string; list: List }) =>
        createAction("setEditedList", { boardId, list }),
    addCard: ({ boardId, card }: { boardId: string; card: Card }) => createAction("addCard", { boardId, card }),
    setEditedCard: ({ boardId, card }: { boardId: string; card: Card }) =>
        createAction("setEditedCard", { boardId, card }),
    createBoard: (board: Board) => createAction("createBoard", board)
}
export type Actions = ReturnType<typeof actions[keyof typeof actions]>

/* INITIAL STATE */
export const initialState: AppState = {
    boards
}

/* REDUCER */
export const reducer: LoopReducer<AppState, Actions> = (state, action: Actions) => {
    if (!state) return initialState
    const ext = extend(state)
    const mapBoard = (bId: string) => (op: F1<Board, Partial<Board>>) => (b: Board) =>
        b.id === bId ? { ...b, ...op(b) } : b

    switch (action.type) {
        case "addList":
            return ext({
                boards: state.boards.map(
                    mapBoard(action.payload.boardId)(b => ({ lists: [...b.lists, action.payload.list] }))
                )
            })
        case "addCard":
            return ext({
                boards: state.boards.map(
                    mapBoard(action.payload.boardId)(b => ({ cards: [...b.cards, action.payload.card] }))
                )
            })
        case "setEditedCard":
            const editCard = (c: Card) => (c.id === action.payload.card.id ? action.payload.card : c)
            return ext({
                boards: state.boards.map(mapBoard(action.payload.boardId)(b => ({ cards: b.cards.map(editCard) })))
            })
        case "setEditedList":
            const editList = (l: List) => (l.id === action.payload.list.id ? action.payload.list : l)
            return ext({
                boards: state.boards.map(mapBoard(action.payload.boardId)(b => ({ lists: b.lists.map(editList) })))
            })
        case "createBoard":
            return ext({
                boards: [...state.boards, action.payload]
            })
        default:
            return state
    }
}
