/// <reference path="./utils/typedActions.d.ts" />
/// <reference path="./utils/store.d.ts" />
/// <reference path="./utils/types.d.ts" />

type MapState<TS, TO = {}> = MapStateToProps<TS, TO, RootState>
type MapDispatch<TA, TO = {}> = MapDispatchToPropsFunction<TA, TO>

type RootState = { app: AppState; router: any }

type AppState = { boards: Board[] }

type Card = { id: string; listId: string; title: string; description?: string }
type List = { id: string; title: string }
type Board = { id: string; title: string; lists: List[]; cards: Card[] }
