/// <reference path="./utils/typedActions.d.ts" />
/// <reference path="./utils/store.d.ts" />
/// <reference path="./utils/types.d.ts" />

type MapState<TS, TO = {}> = MapStateToProps<TS, TO, RootState>
type MapDispatch<TA, TO = {}> = MapDispatchToPropsFunction<TA, TO>

type RootState = { board: AppState; router: any }

type AppState = { boards: Board[] }

type Card = { id: number; listId: number; title: string; description?: string }
type List = { id: number; title: string }
type Board = { id: number; title: string; description?: string; lists: List[]; cards: Card[] }
