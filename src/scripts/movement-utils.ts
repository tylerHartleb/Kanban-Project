import { KanbanItem } from "../types/KanbanTypes";

export function reorder(list: KanbanItem[], sourceIndex: number, destinationIndex: number): KanbanItem[] {
    const result = [...list];
    const [ removed ] = result.splice(sourceIndex, 1);
    result.splice(destinationIndex, 0, removed)
    return result;
}