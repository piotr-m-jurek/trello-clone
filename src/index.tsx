import * as React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import { getStore } from "./store"
import { HelloView } from "./components/Hello"

render(
    <Provider store={getStore()}>
        <HelloView />
    </Provider>,
    document.getElementById("app")
)
