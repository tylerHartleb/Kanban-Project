import React, { useState } from "react";
import { Droppable } from 'react-beautiful-dnd';

import DraggableCard from "./DraggableCard";
import { IDroppableGroup } from "../types/KanbanTypes";

import "./DroppableGroup.scss";

const DroppableGroup: React.FC<IDroppableGroup> = ({ groupData }) => {
    const [state, updateState] = useState(groupData);

    return (
        <Droppable
            droppableId={state.id}
        >
            {(provided) => (
                <div 
                    className="droppable-group"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    <h3>{ state.title }</h3>
                    {(state.cards.map((card, index) => {
                        return (
                            <DraggableCard cardData={card} index={index} key={card.id} />
                        )
                    }))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}

export default DroppableGroup;