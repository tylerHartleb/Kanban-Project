import React, { useState } from "react";
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

/* Import Custom components/types */
import DroppableGroup from "./DroppableGroup";

import { reorder } from '../scripts/movement-utils';
import { Cards, Group, IProject } from "../classes/KanbanClasses";

import "./ProjectBoard.scss";

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

    return (
        <div className="project-board">
            <h2>{ title }</h2>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <div className="board-content">
                    <h1>{'<DragDropContext />'}</h1>
                    {state.map((group) => {
                        return (
                            <DroppableGroup groupData={group} key={group.id} />
                        )
                    })}
                </div>
            </DragDropContext>
        </div>
    );
}

export default ProjectBoard;