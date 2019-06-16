declare module "*.scss"

type F0<RT = void> = () => RT
type F1<T, RT = void> = (arg: T) => RT
type F2<T, T2, RT = void> = (arg1: T, arg2: T2) => RT

type SCasted<T, S> = { [P in keyof T]?: S }
type Errors<T> = SCasted<T, string>
type ExtErrors<T> = Errors<T> | string
type Ok<T> = { type: "Ok"; value: T }
type Err<E> = { type: "Err"; error: E; obj: any }
type Result<T, E = ExtErrors<T>> = Ok<T> | Err<E>
