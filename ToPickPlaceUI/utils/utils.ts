export const runOnServer = () => typeof window === 'undefined';

type UpsertParam<U> = {
    id: U
}
export const upsert = <U, T extends UpsertParam<U>>(item: T, items: T[]): T[] => {
    let existing = false;
    const result = [];
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === item.id) {
            result.push(item);
            existing = true;
        }
        else {
            result.push(items[i]);
        }
    }
    if (!existing) result.push(item);
    return result;
}