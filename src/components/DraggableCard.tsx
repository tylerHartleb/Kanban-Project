import React, { useState, useRef, useEffect, useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { 
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
    IonToolbar,
    IonLabel,
    IonMenu,
    useIonActionSheet,
    IonSplitPane,
    IonPage,
    useIonModal
    
} from '@ionic/react';
import { 
    OverlayEventDetail,
} from '@ionic/core';
import { 
    createOutline,
    personAddOutline,
    informationOutline,
} from 'ionicons/icons';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// Custom
import { IDraggableCard } from '../types/KanbanTypes';
import { Card, ICardData } from '../classes/KanbanClasses';

import "./DraggableCard.scss";
import { PageContext } from '../pages/MyBoards';

interface IModalProps {
    cardData: ICardData,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

// #region Card
const DraggableCard: React.FC<IDraggableCard> = ({ cardData, groupName, index }) => {
    // Refs
    const modal = useRef<HTMLIonModalElement>(null);
    
    // States
    const [state, updateState] = useState(cardData);

    // Presenting elements
    const presentingElement = useContext(PageContext) as HTMLElement | undefined;
    const [present] = useIonActionSheet();
    const [presentModal, dismiss] = useIonModal(CardModal, {
        onDismiss: () => dismiss(),
        cardData: state
    });

    function openModal() {
        presentModal({
            onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {},
            presentingElement: presentingElement,
        });
    }

    const callAction = (detail: OverlayEventDetail) => {
        const actionToCall = detail.data.action;
        
        if (actionToCall == "edit") {
            openModal();
        }
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
                            <IonCardContent>
                                { state.description }
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
    onDismiss: () => void
}

// #region Modal Content
const CardModal: React.FC<CardModalProps> = ({cardData, onDismiss}) => {
    const [card, updateCard] = useState(cardData);

    useEffect(() => {
        const collection: HTMLCollectionOf<Element> = document.getElementsByClassName("list-button");
        for(var i = 0; i <  collection.length; i++) {
            const element: Element | null = collection.item(i);
            if (element != null && element.shadowRoot != null) {
                element.shadowRoot?.querySelector('.button-inner')?.setAttribute('justifyContent', 'flex-start');

                const sheet = new CSSStyleSheet();
                sheet.replaceSync(`.button-inner { justify-content: flex-start; padding-left: 4px;}`);

                const elemStyleSheets = element.shadowRoot.adoptedStyleSheets;
                console.log(elemStyleSheets)
                console.log(sheet)

                element.shadowRoot.adoptedStyleSheets = [...elemStyleSheets, sheet];
            }  
        }
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        {card.title}
                        {/* <IonTitle size="small">In list {groupTitle}</IonTitle> */}
                    </IonTitle>
                    <IonButtons slot="end">
                        <IonButton fill="clear" onClick={() => onDismiss()}>Close</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="card-modal">
                <div className="card-modal__content">
                    <div className="card-modal__main">
                        <section className="description-section">
                            <h5 className="section-title">Description</h5>

                            <div className="description">

                            </div>
                        </section> 
                    </div>

                    <section className="card-modal__sidebar">
                        <IonList className="buttons-list">
                            <IonListHeader className="list-title">Add to card</IonListHeader>
                            <IonButton className="list-button" size='small' color="light">
                                <IonIcon size='small' slot="start" icon={personAddOutline} />
                                Add Members
                            </IonButton>
                            <IonButton className="list-button" size='small' color="light">
                                <IonIcon size='small' slot="start" icon={personAddOutline} />
                                Check list
                            </IonButton>
                        </IonList>

                        <IonList className="actions-list">
                            <IonListHeader className="list-title">Actions</IonListHeader>
                        </IonList>
                    </section>
                </div>
            </IonContent>
        </IonPage>
    )
}
// #endregion

export default DraggableCard;