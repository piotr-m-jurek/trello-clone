import * as React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import { getStore } from "./store"
import { App } from "./views"

render(
    <Provider store={getStore()}>
        <App />
    </Provider>,
    document.getElementById("app")
)
