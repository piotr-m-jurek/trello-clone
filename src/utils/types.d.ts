declare module "*.scss"
type TMap2<TKey extends string, TValue> = { [K in TKey]?: TValue }
type TMap<TKey extends string, TValue> = { [K in TKey]: TValue }
type SMap<TValue> = TMap<string, TValue>

type Casted<T, S> = { [P in keyof T]: S }
type Subtype<T> = { [P in keyof T]?: T[keyof T] }
type SCasted<T, S> = { [P in keyof T]?: S }

type Nothing = { type: "Nothing" }
type Some<T> = { type: "Some"; value: T }
type Maybe<T> = Some<T> | Nothing

type Errors<T> = SCasted<T, string>
type ExtErrors<T> = Errors<T> | string
type Ok<T> = { type: "Ok"; value: T }
type Err<E> = { type: "Err"; error: E; obj: any }
type Result<T, E = ExtErrors<T>> = Ok<T> | Err<E>
type Validator<T, E = ExtErrors<T>> = (o: any, msg?: string) => Result<T, E>

type F0<RT = void> = () => RT
type F1<T, RT = void> = (arg: T) => RT
type F2<T, T2, RT = void> = (arg1: T, arg2: T2) => RT
