
export type KanbanItem = {
    id: string,
    content: string
}

export type KanbanGroup = {
    name: string,
    id: string,
    items: KanbanItem[]
}

export interface KanbanData {
    boardName: string,
    groups: KanbanGroup[]
}