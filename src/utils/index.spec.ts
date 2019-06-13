import {
    mapRepeat,
    isFunction,
    isArray,
    isValid,
    toByte,
    toMinMax,
    areEqual,
    joinArrays,
    call,
    iterateObject,
    toArray,
    isEmpty,
    mapObject,
    filterObject
} from "."

describe("utils", () => {
    describe("isEmpty()", () => {
        it("is empty", () => {
            expect(isEmpty(undefined)).toBeTruthy()
            expect(isEmpty(null)).toBeTruthy()
            expect(isEmpty("")).toBeTruthy()
            expect(isEmpty(false)).toBeFalsy()
            expect(isEmpty({})).toBeTruthy()
            expect(isEmpty([])).toBeTruthy()
        })

        it("is not empty", () => {
            expect(isEmpty(0)).toBeFalsy()
            expect(isEmpty("foo")).toBeFalsy()
            expect(isEmpty([1])).toBeFalsy()
            expect(isEmpty({ a: 1 })).toBeFalsy()
        })
    })
    describe("repeat()", () => {
        it("repeats 0 times", () => {
            expect(mapRepeat(0, _ => null)).toEqual([])
        })

        it("repeats -1 times", () => {
            expect(mapRepeat(-1, _ => null)).toEqual([])
        })

        it("repeats 2 times", () => {
            expect(mapRepeat(2, index => index)).toEqual([0, 1])
        })

        it("repeats 300 times", () => {
            expect(mapRepeat(300, index => index * index)[299]).toEqual(299 * 299)
        })
    })

    describe("isFunction()", () => {
        it("recognizes functions", () => {
            expect(isFunction(() => true)).toBeTruthy()
            /* tslint:disable:only-arrow-functions*/
            expect(
                isFunction(function() {
                    return true
                })
            ).toBeTruthy()
        })
        it("fails on non function argument", () => {
            expect(isFunction(true)).toBeFalsy()
            expect(isFunction({})).toBeFalsy()
            expect(isFunction(undefined)).toBeFalsy()
            expect(isFunction(null)).toBeFalsy()
        })
    })
    describe("isArray()", () => {
        it("recognizes arrays", () => {
            expect(isArray([])).toBeTruthy()
            expect(isArray([""])).toBeTruthy()
            expect(isArray([[]])).toBeTruthy()
        })
        it("fails on non arrays argument", () => {
            expect(isArray(true)).toBeFalsy()
            expect(isArray({})).toBeFalsy()
            expect(isArray(undefined)).toBeFalsy()
            expect(isArray(null)).toBeFalsy()
        })
    })

    describe("isValid()", () => {
        it("recognizes valid conditions", () => {
            expect(isValid(true)).toBeTruthy()
            expect(isValid(() => true)).toBeTruthy()
        })
        it("fails on invalid conditions", () => {
            expect(isValid(false)).toBeFalsy()
            expect(isValid(() => false)).toBeFalsy()
            expect(isValid(null as any)).toBeFalsy()
            expect(isValid(undefined as any)).toBeFalsy()
        })
    })
    describe("toByte()", () => {
        it("maps value to byte", () => {
            expect(toByte(0, 0, 255)).toEqual(0)
            expect(toByte(128, 0, 255)).toEqual(128)
            expect(toByte(255, 0, 255)).toEqual(255)
            expect(toByte(-1, 0, 255)).toEqual(0)
            expect(toByte(256, 0, 255)).toEqual(255)
        })
    })
    describe("toMinMax()", () => {
        it("maps value to range", () => {
            expect(toMinMax(2, 0, 1)).toEqual(1)
            expect(toMinMax(0.1, 0, 1)).toEqual(0.1)
            expect(toMinMax(-0.1, 0, 1)).toEqual(0)
        })
    })

    describe("arrays areEqual()", () => {
        it("success when two arrays are equals", () => {
            expect(areEqual([1, 2, 3], [1, 2, 3])).toBeTruthy()
            expect(areEqual([], [])).toBeTruthy()
        })

        it("success when compare return true", () => {
            expect(areEqual([1, 2], [2, 3], () => true)).toBeTruthy()
            expect(areEqual([{ id: "foo", cnt: 1 }], [{ id: "foo", cnt: 2 }], (a, b) => a.id === b.id)).toBeTruthy()
        })

        it("fails when arrays are not equal", () => {
            expect(areEqual([2, 1, 3], [2, 1])).toBeFalsy()
            expect(areEqual([2, 1, 3], [1, 2, 3])).toBeFalsy()
            expect(areEqual([2, 1, 3], [])).toBeFalsy()
            expect(areEqual([], [2, 1, 3])).toBeFalsy()
        })
    })

    describe("arrays joinArrays()", () => {
        it("success when two arrays are equals", () => {
            expect(joinArrays([1], [2], (a, b) => a === b)).toEqual([1, 2])
            expect(joinArrays([1, 2], [2], (a, b) => a === b)).toEqual([1, 2])
            expect(joinArrays([1], [1, 2], (a, b) => a === b)).toEqual([1, 2])
            expect(joinArrays([1], [], (a, b) => a === b)).toEqual([1])
            expect(joinArrays([], [1], (a, b) => a === b)).toEqual([1])
            expect(joinArrays([1, 2], [2, 3], (a, b) => a === b)).toEqual([1, 2, 3])
        })
    })

    describe("call()", () => {
        it("calls function when function is passed", done =>
            call((arg: number) => {
                expect(arg).toEqual(2)
                done()
            }, 2))

        it("calls no function when no function is passed", () => {
            call(null as any, 2)
            call(undefined as any, 2)
            call({} as any, 2)
        })
    })

    describe("iterateObject()", () => {
        it("iterates nothing when empty object is given", () => {
            const result: string[] = []
            iterateObject(null, (key: string) => result.push(key))
            expect(result).toEqual([])
            iterateObject({}, key => result.push(key))
            expect(result).toEqual([])
        })
        it("iterates all keys and values", () => {
            const abc = { a: 1, b: "2", c: true }
            const result: typeof abc = {} as any
            iterateObject(abc, (key, value) => (result[key] = value))
            expect(result).toEqual(abc)
        })
    })

    describe("toArray()", () => {
        it("gets empty array if none or empty object is given", () => {
            expect(toArray(null as any, null as any)).toEqual([])
            expect(toArray({}, null as any)).toEqual([])
        })

        it("maps object to array of indexes", () => {
            expect(toArray({ k1: "foo", k2: "bar" }, (_, _2, index) => index)).toEqual([0, 1])
        })

        it("maps object to array of keys", () => {
            expect(toArray({ k1: "foo", k2: "bar" }, (_, key, _2) => key)).toEqual(["k1", "k2"])
        })

        it("maps object to array of values", () => {
            expect(toArray({ k1: "foo", k2: "bar" }, (value, _, _2) => value)).toEqual(["foo", "bar"])
        })
    })

    describe("mapObject", () => {
        it("maps object to array of keys with no filter", () =>
            expect(mapObject({ k1: "foo", k2: "bar" }, (_, key) => key)).toEqual(["k1", "k2"]))

        it("maps object to array of values with no filter", () =>
            expect(mapObject({ k1: "foo", k2: "bar" }, v => v)).toEqual(["foo", "bar"]))

        it("maps object to array of values with filter", () =>
            expect(mapObject({ k1: "foo", k2: "bar" }, v => v, v => v !== "bar")).toEqual(["foo"]))

        it("maps object to array of values with filter 2", () =>
            expect(mapObject({ k1: "foo", k2: "bar" }, v => v, _ => false)).toEqual([]))
    })

    describe("filterObject", () => {
        it("filters object", () => {
            expect(filterObject({ a: "A", b: "B" }, k => k !== "a")).toEqual({ b: "B" })
            expect(filterObject({ a: "A", b: "B" }, k => k !== "b")).toEqual({ a: "A" })
            expect(filterObject({ a: "A", b: "B" }, k => k !== "c")).toEqual({ a: "A", b: "B" })
        })
    })

    // tslint:disable-next-line:max-file-line-count
})
