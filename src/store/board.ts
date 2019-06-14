import { LoopReducer } from "redux-loop"
import { createAction } from "../utils/typedActions"
import { boards } from "./mock"
import { extend } from "../utils/store"


/* ACTIONS */
export const actions = {
    increment: () => createAction("increment"),
    addList: ({ boardId, list }: { boardId: number; list: List }) => createAction("addList", { boardId, list })
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

    switch (action.type) {
        case "addList":
            const mapBoard = (b: Board) =>
                b.id === action.payload.boardId ? { ...b, lists: [...b.lists, action.payload.list] } : b
            return ext({
                boards: state.boards.map(mapBoard)
            })
        default:
            return state
    }
}
