import * as React from "react"
import { Route, Switch } from "react-router-dom"

import { getHistory } from "../store"
import { ConnectedRouter } from "connected-react-router"
import { HelloView } from "../components/Hello"
import { BoardView } from "./BoardView"
import { NoMatch } from "../components/NoMatch"

export const App = () => (
    <ConnectedRouter history={getHistory()}>
        <Switch>
            <Route path="/" key="root" component={HelloView} exact />
            <Route path="/board/:boardId" key={"/board/:boardId"} component={BoardView} exact />
            <Route component={NoMatch} />
        </Switch>
    </ConnectedRouter>
)