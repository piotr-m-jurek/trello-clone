import { LoopReducer } from "redux-loop"
import { createAction } from "../utils/typedActions"
import { board } from "./mock"
import { extend } from "../utils/store"

export const actions = {
    increment: () => createAction("increment"),
    addList: ({ boardId, list }: { boardId: number; list: List }) => createAction("addList", { boardId, list })
}

export type Actions = ReturnType<typeof actions[keyof typeof actions]>

export const initialState: Board = board

export const reducer: LoopReducer<Board, Actions> = (state, action: Actions) => {
    if (!state) return initialState
    const ext = extend(state)

    switch (action.type) {
        case "addList":
            return ext({
                lists: [...state.lists, action.payload.list]
            })
        default:
            return state
    }
}
