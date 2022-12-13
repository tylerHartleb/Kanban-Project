import React, { useState, useRef } from "react";
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonPage
} from '@ionic/react';
/* Import Custom components/types */
import DroppableGroup from "./DroppableGroup";

import { reorder } from '../scripts/movement-utils';
import { Cards, Group, IProject } from "../classes/KanbanClasses";

import "./ProjectBoard.scss";
import { group } from "console";

const ProjectBoard: React.FC<IProject> = ({ title, groups, members }) => {
    const [state, updateState] = useState(groups);

    function getGroupItems(id: String): Cards {
        const result = state.find(group => group.id === id)?.cards ?? [];
        console.log(result)
        return result;
    }

    function handleOnDragEnd(result: DropResult): void {
        if (!result.destination) return;

        const { source, destination } = result;

        if (source.droppableId === destination.droppableId) {
            const cards = reorder(
                getGroupItems(destination.droppableId),
                source.index,
                destination.index
            )
            const updatedState = [ ...state ];
            const groupToUpdate = updatedState.find(group => group.id === destination.droppableId);
            if (groupToUpdate) groupToUpdate.cards = cards;
            updateState(updatedState);
        } else {
            console.log('Implement move between list object')
        }
    }

    const page = useRef(undefined);
    const [presentingElement, setPresentingElement] = useState<HTMLIonContentElement | undefined>(undefined);

    return (
        <>
            <IonHeader>
                <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton></IonBackButton>
                </IonButtons>
                <IonTitle>{ title }</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="project-board">
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <div className="board-content">
                        {state.map((group) => {
                            return (
                                <DroppableGroup groupData={group} key={group.id} />
                            )
                        })}
                    </div>
                </DragDropContext>
            </IonContent>
        </>
    );
}

export default ProjectBoard;