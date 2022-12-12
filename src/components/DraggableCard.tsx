import React, { useState, useRef } from 'react';
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
    
} from '@ionic/react';
import { 
    OverlayEventDetail,
} from '@ionic/core';
import { 
    createOutline,
    personAddOutline,
    informationOutline,
} from 'ionicons/icons';

// Custom
import { IDraggableCard } from '../types/KanbanTypes';
import { Card } from '../classes/KanbanClasses';

import "./DraggableCard.scss";

const DraggableCard: React.FC<IDraggableCard> = ({ cardData, groupName, index }) => {
    // Refs
    const modal = useRef<HTMLIonModalElement>(null);
    
    // States
    const [state, updateState] = useState(cardData);
    const [groupTitle, updateGroupTitle] = useState(groupName);
    const [isOpen, setIsOpen] = useState(false);

    // Presenting elements
    const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);
    const [present] = useIonActionSheet();

    const setShadowRootStyles = () => {
        const collection: HTMLCollectionOf<Element> = document.getElementsByClassName("list-button");
        for(var i = 0; i <  collection.length; i++) {
            const element: Element | null = collection.item(i);
            if (element != null && element.shadowRoot != null) {
                //element.shadowRoot?.styleSheets[0].addRule(':host', 'display: none');
                element.shadowRoot?.querySelector('.button-inner')?.setAttribute('justifyContent', 'flex-start');

                const sheet = new CSSStyleSheet();
                sheet.replaceSync(`.button-inner { justify-content: flex-start; padding-left: 4px;}`);

                const elemStyleSheets = element.shadowRoot.adoptedStyleSheets;
                console.log(elemStyleSheets)
                console.log(sheet)

                element.shadowRoot.adoptedStyleSheets = [...elemStyleSheets, sheet];
            }  
        }
    }

    const edit = () => {
        setIsOpen(true);
    }

    const callAction = (detail: OverlayEventDetail) => {
        const actionToCall = detail.data.action;
        
        if (actionToCall == "edit") {
            edit();
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
                        <IonCardHeader>
                            <IonCardTitle>
                                { state.title }
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
                            </IonCardTitle>
                        </IonCardHeader>
                        {
                            state.description != "" ? 
                            <IonCardContent>
                                { state.description }
                            </IonCardContent> : null
                        }
                        <IonModal onDidPresent={setShadowRootStyles} ref={modal} isOpen={isOpen} presentingElement={presentingElement!}>
                            <IonHeader>
                                <IonToolbar>
                                    <IonTitle>
                                        {state.title}
                                        <IonTitle size="small">In list {groupTitle}</IonTitle>
                                    </IonTitle>
                                    <IonButtons slot="end">
                                        <IonButton fill="clear" onClick={() => setIsOpen(false)}>Close</IonButton>
                                    </IonButtons>
                                </IonToolbar>
                            </IonHeader>
                            <IonContent className="card-modal">
                                <div className="card-modal__content">
                                    <section className="card-modal__main">
                                        <span className="section-title">
                                            <h5>Description</h5>
                                        </span>
                                    </section>
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
                                        <IonList>
                                            <IonListHeader>Actions</IonListHeader>
                                        </IonList>
                                    </section>
                                </div>
                            </IonContent>
                        </IonModal>
                    </IonCard>
                </div>       
            )}
        </Draggable>
    )
}

export default DraggableCard;