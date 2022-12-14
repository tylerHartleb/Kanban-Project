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
    useIonModal,
    useIonActionSheet
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

import { createTask, updateTaskList, getTasks } from "../clientAPI/boardActionAPI";

//create your forceUpdate hook
function useForceUpdate(){
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1);
}

const DroppableGroup: React.FC<IDroppableGroup> = ({ groupData, deleteGroup }) => {
    const [state, updateState] = useState(groupData);
    const [cards, updateCards] = useState(groupData.cards)
    const [isCreating, setCreating] = useState(false);
    const forceUpdate = useForceUpdate();

    const fetchData = useCallback(async () => {
        const data =  await getTasks(groupData.id)
        data.sort((a:any,b:any) => a.position - b.position);

        const tasks = data.map((task: { title: string, description: string, _id: string, creator: string }) => {
            return new Card(task._id, task.title, task.creator, task.description)
        })

        updateCards(tasks);
    }, [])
    
    // #region Hooks
    useEffect(() => {
    fetchData().catch();
    }, []);
    // #endregion

    function updateGroupTitle(event: IonInputCustomEvent<InputChangeEventDetail>) {
        const title : string = event.detail.value ?? "";
        state.title = title;
        updateTaskList(state.id, {title: state.title});
    }

    function deleteSelf() {
        deleteGroup(groupData.id);
    }

    async function createCard(event: IonInputCustomEvent<FocusEvent>) {
        const relatedTarget = event.detail.relatedTarget as Element;
        if (relatedTarget?.id == "cancel-add") {
            setCreating(false);
        }

        const title = event.target.value as string
        
        if (title) {
            const response = await createTask(state.id, { title: title });
            await fetchData();
        }     
        setCreating(false);
    }

    async function deleteCard(id: string) {
        await fetchData();
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

    const [presentSheet] = useIonActionSheet();
    const callAction = (detail: OverlayEventDetail) => {
        const actionToCall = detail.data.action;
        
        if (actionToCall == "edit") {
            openModal();
        } else if (actionToCall == 'delete') {
            deleteSelf();
        }
    }

    function openModal() {
        present({
            onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
                if (ev.detail.data != "") {
                    state.title = ev.detail.data;
                    updateTaskList(state.id, {title: state.title});
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
                                    <IonButton className="delete-board" fill="clear" onClick={() =>
                                        presentSheet({
                                            header: `${groupData.title}`,
                                            buttons: [
                                                {
                                                    text: 'Delete',
                                                    role: 'destructive',
                                                    data: {
                                                    action: 'delete',
                                                    },
                                                },
                                                {
                                                    text: 'Edit',
                                                    data: {
                                                    action: 'edit',
                                                    },
                                                },
                                                {
                                                    text: 'Cancel',
                                                    role: 'cancel',
                                                    data: {
                                                    action: 'cancel',
                                                    },
                                                },
                                            ],
                                            onDidDismiss: ({ detail }) => callAction(detail),
                                        })}>
                                        <IonIcon slot="icon-only" icon={cogOutline} size="small"></IonIcon>
                                    </IonButton>
                                </IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <div className="droppable-group__content">
                                    {(cards.map((card, index) => {
                                        return(
                                            <DraggableCard cardData={card} groupName={state.title} index={index} key={card.id} groupId={state.id} deleteCard={deleteCard} />
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