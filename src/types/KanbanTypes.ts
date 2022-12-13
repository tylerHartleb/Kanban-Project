import { ICardData, IGroupData } from "../classes/KanbanClasses";

export type IDraggableCard = {
    cardData: ICardData,
    groupName: string,
    index: number,
    deleteCard: (id: string) => void
}

export type IDroppableGroup = {
    groupData: IGroupData,
}

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