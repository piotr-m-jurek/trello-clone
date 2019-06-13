import { install, combineReducers } from "redux-loop"
import { Store, compose, createStore, applyMiddleware } from "redux"
import { connectRouter, routerMiddleware } from "connected-react-router"
import { createBrowserHistory } from "history"
import * as board from "./board"

let _history: ReturnType<typeof createBrowserHistory> = null as any
export const getHistory = () => {
    if (!_history) _history = createBrowserHistory()
    return _history
}

let _store: Store<RootState> | null = null

const initialState: RootState = { board: board.initialState, router: null }

const initStore = () => {
    const { __REDUX_DEVTOOLS_EXTENSION__ = () => (f: any) => f } = window as any
    return createStore(
        combineReducers<any>({ board: board.reducer, router: connectRouter(getHistory()) }),
        initialState as any,
        compose(
            install(),
            __REDUX_DEVTOOLS_EXTENSION__(),
            applyMiddleware(routerMiddleware(getHistory()))
        )
    ) as Store<RootState>
}

export const getStore = () => {
    if (!_store) {
        _store = initStore()
    }
    return _store
}
