import React, { useState, useRef, useEffect, useContext, useCallback } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
    IonAvatar,
    IonButton, 
    IonButtons,
    IonCard, 
    IonCardContent, 
    IonCardHeader, 
    IonCardTitle, 
    IonContent,
    IonHeader,
    IonIcon,
    IonModal,
    IonPopover,
    IonCardSubtitle,
    IonList,
    IonItem,
    IonListHeader,
    IonTitle,
    IonTextarea,
    IonToolbar,
    IonLabel,
    IonMenu,
    useIonActionSheet,
    IonSplitPane,
    IonPage,
    useIonModal,
    IonItemDivider
    
} from '@ionic/react';
import { 
    OverlayEventDetail,
    IonInputCustomEvent,
    InputChangeEventDetail,
    IonTextareaCustomEvent,
    TextareaChangeEventDetail,
} from '@ionic/core';
import { 
    createOutline,
    peopleOutline  
} from 'ionicons/icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// Custom
import { IDraggableCard } from '../types/KanbanTypes';
import { Card, ICardData } from '../classes/KanbanClasses';

import "./DraggableCard.scss";
import 'katex/dist/katex.min.css'
import { PageContext } from '../pages/MyBoards';
import userActionAPI from '../clientAPI/userActionAPI';
import { deleteBoard, deleteTask, updateTask } from '../clientAPI/boardActionAPI';

// #region Card
const DraggableCard: React.FC<IDraggableCard> = ({ cardData, groupName, index, groupId, deleteCard }) => {
    // States
    const [state, updateState] = useState(cardData);

    // Presenting elements
    const [present] = useIonActionSheet();
    const [presentModal, dismiss] = useIonModal(CardModal, {
        onDismiss: () => dismiss(),
        cardData: state,
        groupTitle: groupName,
        groupId: groupId
    });

    function openModal() {
        presentModal({
            onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {},
        });
    }

    const callAction = (detail: OverlayEventDetail) => {
        const actionToCall = detail.data.action;
        
        if (actionToCall == "edit") {
            openModal();
        } else if (actionToCall == 'delete') {
            removeCard();
        }
    }

    async function removeCard() {
        await deleteTask(state.id);
        deleteCard(state.id);
    }

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
                    <IonCard className="task">
                        <IonCardHeader className="task-header">
                            <IonCardTitle>
                                { state.title }
                            </IonCardTitle>
                            <IonButton 
                                className="edit-task"
                                fill="clear"
                                onClick={() =>
                                    present({
                                        header: `${state.title}`,
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
                                    })
                                } 
                            >
                                <IonIcon slot="icon-only" icon={createOutline} size="small"></IonIcon>
                            </IonButton>
                        </IonCardHeader>
                        {
                            state.description != "" ? 
                            <IonCardContent className="card-desc">
                                <ReactMarkdown children={state.description} remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]} />
                            </IonCardContent> : null
                        }
                    </IonCard>
                </div>       
            )}
        </Draggable>
    )
}
// #endregion

interface CardModalProps {
    cardData: ICardData,
    groupTitle: string,
    groupId: string,
    onDismiss: () => void
}

// #region Modal Content
const CardModal: React.FC<CardModalProps> = ({cardData, groupTitle, groupId, onDismiss}) => {
    const [card, updateCard] = useState(cardData);
    const [isEdit, setIsEdit] = useState(false);
    const [edit, updateEdit] = useState(card.description);
    const [user, setUser] = useState({} as { name: string });

    function saveChanges() {
        const textarea = document.getElementById("edit-textarea");
        card.description = textarea?.textContent ?? "";
        
        updateEdit(textarea?.textContent ?? "");
        updateTask(cardData.id, { description: cardData.description  })
        setIsEdit(false);
    }

    function cancelChanges() {
        if (edit != card.description) {
            updateEdit(card.description);
        }

        setIsEdit(false);
    }

    const fetchData = useCallback(async () => {
        const data = await userActionAPI.getUserInfo();

        setUser(data);
      }, [])
    
      // #region Hooks
      useEffect(() => {
        fetchData().catch();
      }, []);
      // #endregion

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        {groupTitle}
                    </IonTitle>
                    <IonButtons slot="end">
                        <IonButton fill="clear" onClick={() => onDismiss()}>Close</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="card-modal">
                <div className="card-modal__content">
                    <h1 className="card-modal__title">{ card.title }</h1>
                    <div className="card-modal__info">
                        <section className="card-modal__section">
                            <IonItem class="card-label" lines='none'>
                                <IonIcon size='small' icon={peopleOutline} slot="start" />
                                <IonLabel >{"Creator"}</IonLabel>
                            </IonItem>

                            {user?.name ?
                                <div className="card-modal__members">
                                        <IonItem lines='none'>
                                            <IonAvatar slot="start">
                                                <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                                            </IonAvatar>
                                            <IonLabel>
                                                { user.name }
                                            </IonLabel>
                                        </IonItem>
                                </div>
                            : null}
                        </section>
                    </div>
                    <IonItem>
                        <IonLabel color="medium">{ "Description" }</IonLabel>
                        <IonButtons slot='end'>
                            <IonButton onClick={() => setIsEdit(true)} color="medium" fill="clear" size='small'>Edit</IonButton>
                        </IonButtons>
                    </IonItem>
                    <div className="card-modal__desc">
                        <section>
                            {isEdit ?
                                <div className="card-modal__desc-edit">
                                    <IonTextarea
                                        id="edit-textarea"
                                        autoGrow={true}
                                        autofocus={true}
                                        placeholder="Type something here"
                                        value={card.description}
                                    />
                                    <div className="desc-edit__btns">
                                        <IonButton onClick={() => saveChanges()} >Save</IonButton>
                                        <IonButton onClick={() => cancelChanges()} fill="clear">Cancel</IonButton>
                                    </div>
                                </div> :
                                <ReactMarkdown children={card.description} remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]} />
                            }         
                        </section>                                       
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}
// #endregion

export default DraggableCard;