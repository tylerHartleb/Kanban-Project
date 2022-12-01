import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

// Custom
import { IDraggableCard } from '../types/KanbanTypes';
import { Card } from '../classes/KanbanClasses';

import "./DraggableCard.scss";

const DraggableCard: React.FC<IDraggableCard> = ({ cardData, index }) => {
    const [state, updateState] = useState(cardData);

    return (
        <Draggable
            draggableId={state.id}
            index={index}
        >
            {( provided ) => (
                <div
                    className="draggable-card"
                    ref={provided.innerRef} 
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    { state.title }
                </div>
            )}
        </Draggable>
    )
}

export default DraggableCard;