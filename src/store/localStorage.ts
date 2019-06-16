const localStorageKey = "trello-state"

export const loadState = (): AppState | undefined => {
    try {
        const serializedState = localStorage.getItem(localStorageKey)
        if (serializedState == null) return undefined
        else return JSON.parse(serializedState)
    } catch (e) {
        // tslint:disable-next-line: no-console
        console.error("load state failed with: ", e)
        return undefined
    }
}

export const saveState = (state: AppState) => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem(localStorageKey, serializedState)
    } catch (e) {
        // tslint:disable-next-line: no-console
        console.error("save state failed with: ", e)
    }
}
