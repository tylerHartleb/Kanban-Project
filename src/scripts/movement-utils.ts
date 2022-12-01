import { Cards } from "../classes/KanbanClasses";

export function reorder(list: Cards, sourceIndex: number, destinationIndex: number): Cards {
    const result = [...list];
    const [ removed ] = result.splice(sourceIndex, 1);
    result.splice(destinationIndex, 0, removed)
    return result;
}