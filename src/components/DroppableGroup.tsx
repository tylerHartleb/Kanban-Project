import React, { useState, useRef } from "react";
import { Droppable } from 'react-beautiful-dnd';
import { 
    IonCard, 
    IonCardContent, 
    IonContent,
    IonCardHeader, 
    IonCardTitle, 
    IonButton, 
    IonIcon, 
    IonInput, 
    IonItem,
    IonModal,
    IonHeader,
    IonTitle,
    IonButtons,
    IonToolbar,
    IonList,
    IonLabel,
} from '@ionic/react';
import {
    IonInputCustomEvent,
    InputChangeEventDetail,
} from '@ionic/core'
import { cogOutline } from 'ionicons/icons';

import DraggableCard from "./DraggableCard";
import { IDroppableGroup } from "../types/KanbanTypes";

import "./DroppableGroup.scss";

const DroppableGroup: React.FC<IDroppableGroup> = ({ groupData }) => {
    const [state, updateState] = useState(groupData);
    const [isOpen, setIsOpen] = useState(false);
    const modal = useRef<HTMLIonModalElement>(null);

    function updateGroupTitle(event: IonInputCustomEvent<InputChangeEventDetail>) {
        const title : string = event.detail.value ?? "";
        state.title = title;
    }

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
                    <IonCard className="task-list">
                        <IonCardHeader>
                            <IonCardTitle>
                                <IonItem className="title">
                                    <IonInput
                                        className="title-input"
                                        value={state.title}
                                        onIonChange={updateGroupTitle}
                                        debounce={250}
                                        inputMode="text"
                                    />
                                </IonItem>
                                 <IonButton className="edit-card" fill="clear" onClick={() => setIsOpen(true)}>
                                    <IonIcon slot="icon-only" icon={cogOutline} size="small"></IonIcon>
                                </IonButton>
                            </IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <div className="droppable-group__content">
                                {(state.cards.map((card, index) => {
                                    return (
                                        <DraggableCard cardData={card} groupName={state.title} index={index} key={card.id} />
                                    )
                                }))}
                                {provided.placeholder}
                            </div>
                        </IonCardContent>
                    </IonCard>
                    <IonModal ref={modal} isOpen={isOpen}>
                        <IonHeader>
                            <IonToolbar>
                                <IonTitle>List Actions</IonTitle>
                                <IonButtons slot="end">
                                    <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
                                </IonButtons>
                            </IonToolbar>
                        </IonHeader>
                        <IonContent className="modal-content">
                            <IonList>
                                <IonItem className="title-input">
                                    <IonLabel position="stacked">Title</IonLabel>
                                    <IonInput 
                                        onIonChange={updateGroupTitle}
                                        debounce={250}
                                        inputMode="text"
                                        value={state.title}
                                    />
                                </IonItem>
                            </IonList>
                        </IonContent>
                    </IonModal>
                </div>
            )}
        </Droppable>
    );
}

export default DroppableGroup;