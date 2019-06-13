import { Cmd, CmdType, loop, Loop } from "redux-loop"

export type Ext<A extends TypedAction<any> | TypePayloadAction<any, any> = any, TState = RootState> = (
    delta: Partial<TState>,
    cmd?: CmdType<A>
) => Loop<TState, any> | TState

export const extend = <A extends TypedAction<A> | TypePayloadAction<A, any>, TState>(state: TState): Ext<A, TState> => (
    delta,
    c
) => (c ? (loop({ ...state, ...delta }, c) as Loop<TState, any>) : (({ ...state, ...delta } as any) as TState))

export const extendPlain = <T>(o: T) => (delta: Partial<T>): T => ({ ...o, ...delta })

export const cmd = (type: string, c: () => void) =>
    Cmd.run(c, {
        successActionCreator: () => ({ type: `${type}Success` }),
        failActionCreator: () => ({ type: `${type}Failed` })
    })
