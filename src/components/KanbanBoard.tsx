import React, { useState } from 'react';
import { DragDropContext, DropResult, Droppable, Draggable } from 'react-beautiful-dnd';

/* Import Custom components/types */
import { reorder } from '../scripts/movement-utils';
import { KanbanItem, KanbanGroup, KanbanData } from '../types/KanbanTypes';

/* Import Styles */
import './KanbanBoard.scss'

const KanbanBoard: React.FC<KanbanData> = ({ boardName, groups }) => {
    const [state, updateState] = useState(groups)

    function getGroupItems(id:String): KanbanItem[] {
        const result = state.find(group => group.id === id)?.items ?? [];
        console.log(result)
        return result;
    }

    function handleOnDragEnd(result: DropResult): void {
        if (!result.destination) return;

        const { source, destination } = result;

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                getGroupItems(destination.droppableId),
                source.index,
                destination.index
            )
            const updatedState = [ ...state ];
            const groupToUpdate = updatedState.find(group => group.id === destination.droppableId);
            if (groupToUpdate) groupToUpdate.items = items;
            updateState(updatedState);
        } else {
            console.log('Implement move between list object')
        }
    }

    return (
        <div className="kanban-board">
            <h2>{ boardName }</h2>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <div className='board-content'>
                    <h1>{'<DragDropContext />'}</h1>
                    {
                        groups.map(({name, id, items}) => {
                            return (
                                <Droppable 
                                    key={id} 
                                    droppableId={id}
                                >
                                    {( provided ) => (
                                        <div
                                            className="kanban-group"
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                                <h3>{ name }</h3>
                                                {items.map((item, index) => {
                                                    return (
                                                        <Draggable 
                                                            key={item.id} 
                                                            draggableId={item.id} 
                                                            index={index}
                                                        >
                                                            {( provided ) => (
                                                                <div
                                                                    className="kanban-item"
                                                                    ref={provided.innerRef} 
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                >
                                                                    { item.content }
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    )
                                                })}
                                                {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            )
                        })
                    }
                </div>
            </DragDropContext>
        </div>
    )
}

export default KanbanBoard;