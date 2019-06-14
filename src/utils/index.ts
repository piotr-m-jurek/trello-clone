const NArray = (length: number) => Array.apply(null, { length }).map(Number.call, Number)
export const isEmpty = (v: any) =>
    v === undefined || v === null || v === "" || JSON.stringify(v) === "{}" || JSON.stringify(v) === "[]"

export const mapRepeat: <T>(length: number, cb: (index: number) => T) => T[] = (length, cb) => NArray(length).map(cb)
export const repeat = (length: number, cb: (index: number) => void) => NArray(length).forEach(cb) as void
export const isFunction = (f: any): f is Function => "function" === typeof f
export const isArray = <T>(ts: T[] | any): ts is T[] => ts && typeof ts === "object" && ts.constructor.name === "Array"
export const isValid = (pred: boolean | (() => boolean)) => (isFunction(pred) ? pred() : pred)
export const toByte = (value: number, min: number, max: number) => toMinMax(value, min, max)
export const toMinMax = (value: number, min: number, max: number) => (value < min ? min : value > max ? max : value)
export const keys = <T>(o: T) => Object.keys(o) as Array<keyof T>
export const rand = (n: number) => Math.floor((Math.random() * 1000000) % n)
export const randValue = <T>(vs: T[]) => (vs.length ? vs[rand(vs.length)] : null)
export const toArray = <T, T2>(map: SMap<T>, toValue: (t: T, key: keyof T, index?: number) => T2) => {
    const result: T2[] = []
    const f = (field: string, index: number) => result.push(toValue(map[field as any], field as any, index))
    Object.keys(map || {}).forEach(f)
    return result
}

export function toDictonary<T, K = T>(
    vs: T[],
    getKey: (v: T) => string,
    getValue: (v: T, index?: number) => K = v => (v as any) as K
) {
    const dictonary: SMap<K> = {}
    if (isArray(vs) && isFunction(getKey) && isFunction(getValue))
        vs.forEach((v, index) => (dictonary[getKey(v)] = getValue(v, index)))
    return dictonary
}

export const areEqual = <T>(a1: T[], a2: T[], compare: (a: T, b: T) => boolean = (a, b) => a === b) =>
    a1.length === a2.length && a1.every((v, i) => compare(v, a2[i]))

export const joinArrays = <T>(arr1: T[], arr2: T[], compare: (a: T, b: T) => boolean): T[] => {
    const res: T[] = [...arr1]
    arr2.forEach(a2 => {
        if (!arr1.find(a1 => compare(a1, a2))) res.push(a2)
    })
    return res
}
export function call(f?: () => void): void
export function call<T>(f?: (arg: T) => void, arg?: T): void
export function call(f?: any, arg?: any): void {
    if (isFunction(f)) f(arg)
}

export const filter = <T>(o: SMap<T>, condition: (value: T, key: string) => boolean = () => true): SMap<T> => {
    const res: SMap<T> = {}
    Object.keys(o || {}).forEach((key: keyof typeof o) => (condition(o[key], key) ? (res[key] = o[key]) : null))
    return res
}

export const iterateObject = <T>(o: T, cb: (key: keyof T, value: T[keyof T]) => void): void =>
    Object.keys(o || {}).forEach((field: string) => cb((field as any) as keyof T, (o as any)[field]))

export const mapObject = <T, T2 = T>(
    map: SMap<T>,
    toValue: (t: T, key: keyof SMap<T>, index?: number) => T2,
    condition: (t: T, key?: keyof T) => boolean = () => true
): T2[] => {
    const result: T2[] = []
    const f = (field: string, index: number) => {
        const v = map[field as any]
        if (condition(v)) result.push(toValue(v, field as any, index))
    }
    Object.keys(map || {}).forEach(f)
    return result
}

export const cmp = (a: number, b: number): number => (a > b ? 1 : b > a ? -1 : 0)

export const filterObject = <T>(o: SMap<T>, condition: (key: keyof typeof o, value: T) => boolean): SMap<T> => {
    const result: SMap<T> = {}
    const f = (field: string) => {
        if (condition(field, o[field])) result[field] = o[field]
    }
    Object.keys(o || {}).forEach(f)
    return result
}

export const toRegExp = (query: string): RegExp => {
    try {
        return new RegExp(query)
    } catch (e) {
        return new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    }
}
