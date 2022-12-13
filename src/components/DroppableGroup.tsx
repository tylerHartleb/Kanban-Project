import React, { useState, useRef, useEffect, useContext, useCallback } from "react";
import { Droppable } from 'react-beautiful-dnd';
import { 
    IonCard, 
    IonCardContent, 
    IonContent,
    IonCardHeader, 
    IonCardTitle, 
    IonButton, 
    IonIcon,
    IonPage,
    IonInput, 
    IonItem,
    IonModal,
    IonHeader,
    IonTitle,
    IonButtons,
    IonToolbar,
    IonList,
    IonLabel,
    useIonModal
} from '@ionic/react';
import {
    IonInputCustomEvent,
    InputChangeEventDetail,
} from '@ionic/core';
import { cogOutline, addOutline, car } from 'ionicons/icons';
import { OverlayEventDetail } from '@ionic/core/components';

import DraggableCard from "./DraggableCard";
import { IDroppableGroup } from "../types/KanbanTypes";

import userActionAPI from "../clientAPI/userActionAPI";

import "./DroppableGroup.scss";
import { Card } from "../classes/Card";

import { createTask } from "../clientAPI/boardActionAPI";

//create your forceUpdate hook
function useForceUpdate(){
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1);
}

const DroppableGroup: React.FC<IDroppableGroup> = ({ groupData }) => {
    const [state, updateState] = useState(groupData);
    const [isCreating, setCreating] = useState(false);
    const [user, setUser] = useState({} as { _id: string });
    const forceUpdate = useForceUpdate();

    const fetchData = useCallback(async () => {
        const data = await userActionAPI.getUserInfo();

        setUser(data);
      }, [])
    
      // #region Hooks
      useEffect(() => {
        fetchData().catch();
      }, []);
      // #endregion

    function updateGroupTitle(event: IonInputCustomEvent<InputChangeEventDetail>) {
        const title : string = event.detail.value ?? "";
        state.title = title;
    }

    async function createCard(event: IonInputCustomEvent<FocusEvent>) {
        const relatedTarget = event.detail.relatedTarget as Element;
        if (relatedTarget?.id == "cancel-add") {
            setCreating(false);
        }

        const title = event.target.value as string
        
        if (title) {
            const templateCard = new Card(Math.random().toString(), title, user._id);
            groupData.cards.push(templateCard);
            createTask(state.id, { title: title });
            
        }     
        setCreating(false);
    }

    async function deleteCard(id: string) {
        const newCards = state.cards.filter(card => {
            return card.id != id;
        })

        state.cards = newCards;

        forceUpdate();
    }

    function renderCreateCard() {
        if (isCreating) {
            return (
                <>
                    <IonCard className="task-create">
                        <IonCardHeader>
                            <IonCardTitle>
                                <IonItem className="create-title">
                                    <IonInput
                                        autofocus={true}
                                        className="title-input"
                                        placeholder="Enter a title for this task..."
                                        onIonBlur={createCard}
                                        debounce={250}
                                        inputMode="text"
                                    />
                                </IonItem>
                            </IonCardTitle>
                        </IonCardHeader>
                    </IonCard>
                    <div className="add-actions">
                        <IonButton id="add-task">Add task</IonButton>
                        <IonButton id="cancel-add" fill="clear">Cancel</IonButton>
                    </div>
                </>
            )
        } else {
            return (
                <IonButton 
                    fill="clear"
                    onClick={() => setCreating(true)}
                >
                    <IonIcon slot="start" icon={addOutline}></IonIcon>
                    Add a task
                </IonButton>
            )
        }
    }

    const [present, dismiss] = useIonModal(GroupModal, {
        onDismiss: (data: string, role: string) => dismiss(data, role),
        title: state.title
      });

    function openModal() {
        present({
            onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
            if (ev.detail.data != "") {
                state.title = ev.detail.data;
            }
            }
        });
    }

    return (
        <>
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
                                    <IonButton className="edit-card" fill="clear" onClick={openModal}>
                                        <IonIcon slot="icon-only" icon={cogOutline} size="small"></IonIcon>
                                    </IonButton>
                                </IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <div className="droppable-group__content">
                                    {(state.cards.map((card, index) => {
                                        return(
                                            <DraggableCard cardData={card} groupName={state.title} index={index} key={card.id} deleteCard={deleteCard} />
                                        )
                                    }))}
                                    {provided.placeholder}
                                </div>
                                { renderCreateCard() }
                            </IonCardContent>
                        </IonCard>
                    </div>
                )}
            </Droppable>
        </> 
    );
}

interface GroupModalProps {
    onDismiss: (data: string | number) => void,
    title: string
}

const GroupModal: React.FC<GroupModalProps> = ({ onDismiss, title }) => {
    const inputRef = useRef<HTMLIonInputElement>(null);

    return (
      <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>List Actions</IonTitle>
                <IonButtons slot="end">
                    <IonButton onClick={() => onDismiss(inputRef.current?.value ?? "")}>Close</IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent className="modal-content">
            <IonList>
                <IonItem className="title-input">
                    <IonLabel position="stacked">Title</IonLabel>
                    <IonInput
                        ref={inputRef}
                        inputMode="text"
                        value={title}
                    />
                </IonItem>
            </IonList>
        </IonContent>
      </IonPage>
    );
};

export default DroppableGroup;