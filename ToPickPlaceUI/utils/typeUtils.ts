export type SelectableList<T extends {id: U},U> = {
    availables: Array<T>,
    selectedId?: U
}

export type SelectFromList = <T extends {id: U},U>(list: SelectableList<T,U>) => T | undefined