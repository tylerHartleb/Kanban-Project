import React, { useState, useCallback, useEffect } from "react";
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonPage,
    IonButton,
    IonCard,
    IonCardContent,
    IonIcon,
    IonInput,
    useIonActionSheet,
    IonNavLink,
    useIonAlert
} from '@ionic/react';
import { 
    OverlayEventDetail,
} from '@ionic/core';
import { cogOutline, addOutline } from 'ionicons/icons';
/* Import Custom components/types */
import DroppableGroup from "./DroppableGroup";

import { reorder } from '../scripts/movement-utils';
import { Card, Cards, Group, IProject } from "../classes/KanbanClasses";
import { addGroup, deleteTaskList, getGroups, getTasks, updateTask, inviteToBoard } from "../clientAPI/boardActionAPI";
import userActionAPI from "../clientAPI/userActionAPI";

import "./ProjectBoard.scss";

const ProjectBoard: React.FC<IProject> = ({ id, title, owner, deleteSelBoard }) => {
    const [groups, updateGroups] = useState([] as Group[]);
    const [isAdding, setIsAdding] = useState(false);
    const [user, setUser] = useState({} as any);

    const [present] = useIonActionSheet();
    const callAction = (detail: OverlayEventDetail) => {
        const actionToCall = detail.data.action;
        
        if (actionToCall == "add") {
            setIsAdding(true);
        } else if (actionToCall == 'delete') {
            deleteBoard();
        } else if (actionToCall == 'invite') {
            inviteMember();
        }
    }

    const [presentAlert] = useIonAlert()

    function deleteBoard() {
        deleteSelBoard(id);
    }

    function deleteGroup(id: string) {
        deleteTaskList(id);
        const newGroups = groups.filter(group => {
            return group.id != id;
        })

        updateGroups(newGroups);
    }

    function inviteMember() {
        presentAlert({
            header: 'Invite members to board',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Invite',
                    role: 'confirm',
                    handler: (alertData) => {
                        sendInvites(alertData);
                    },
                }, 
            ],
            inputs: [
                {
                    placeholder: "Add member emails"
                }
            ]
        })
    }

    function sendInvites(data: any) {
        const emails = data[0];
        const constEmailList = emails.trim().split(/\s+/);

        Promise.all(
            constEmailList.map(async (collab: any) => {
                return userActionAPI.inviteCollaborator(id, { email: collab});
            })
        )
    }

    function getGroupItems(id: String): Cards {
        const result = groups.find(group => group.id === id)?.cards ?? [];
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
            const updatedState = [ ...groups ];
            const groupToUpdate = updatedState.find(group => group.id === destination.droppableId);
            if (groupToUpdate) {
                groupToUpdate.cards = cards;
                const cardToUpdate = groupToUpdate.cards.at(destination.index)
                if (cardToUpdate) {
                    updateTask(cardToUpdate.id, { position: destination.index })
                }
            } 
            updateGroups(updatedState);
        } else {
                const sourceClone = getGroupItems(source.droppableId);
                const destClone = getGroupItems(destination.droppableId);
                const [ removed ] = sourceClone.splice(source.index, 1);
              
                destClone.splice(destination.index, 0, removed);

                const updatedState = [ ...groups ];
                const sourceToUpdate = updatedState.find(group => group.id === source.droppableId);
                const destToUpdate = updatedState.find(group => group.id === destination.droppableId);

                if (destToUpdate) {
                    const cardToUpdate = destToUpdate.cards.at(destination.index);
                    if (cardToUpdate) {
                        updateTask(cardToUpdate.id, { taskList: destination.droppableId, position: destination.index })
                    }
                }

                if (sourceToUpdate) sourceToUpdate.cards = sourceClone;
                if (destToUpdate) destToUpdate.cards = destClone;
                updateGroups(updatedState);
        }
    }

    function cancelChanges() {
        setIsAdding(false);
    }

    async function saveChanges() {
        const textarea = document.getElementById("edit-textinput") as HTMLInputElement;
        const groupTitle = textarea?.value ?? "";
        
        const response = await addGroup(id , {  groupTitle: groupTitle});
        setIsAdding(false);

        await fetchData();
    }

    const fetchData = useCallback(async () => {
        const data = await getGroups(id);
        const userData = await userActionAPI.getUserInfo();
    
        const newGroups: Group[] = data.map((group: { _id: string; title: string; }) => {
          return new Group(group._id, group.title);
        });

        if (JSON.stringify(groups) != JSON.stringify(newGroups)) {
            updateGroups(newGroups)
        }

        if (JSON.stringify(user) != JSON.stringify(userData)) {
            setUser(userData)
        }
      }, [])
    
    // #region Hooks
    useEffect(() => {
        fetchData().catch();
    }, []);
    // #endregion

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>{ title }</IonTitle>
                    <IonButtons slot="end">
                        <IonButton 
                            fill="clear"
                            onClick={() => {
                                const buttons = []

                                if (owner == user.id) buttons.push({
                                    text: 'Delete',
                                    role: 'destructive',
                                    data: {
                                        action: 'delete',
                                    },
                                })

                                buttons.push({
                                    text: 'Add Task List',
                                    data: {
                                        action: 'add',
                                    },
                                })

                                buttons.push({
                                    text: 'Invite to project',
                                    data: {
                                        action: 'invite',
                                    },
                                })

                                buttons.push({
                                    text: 'Cancel',
                                    role: 'cancel',
                                    data: {
                                        action: 'cancel',
                                    },
                                })

                                present({
                                    header: `${title}`,
                                    buttons: buttons,
                                    onDidDismiss: ({ detail }) => callAction(detail),
                                })
                            }} 
                        >
                            <IonIcon slot="icon-only" icon={cogOutline} size="small"></IonIcon>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="project-board">
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <div className="board-content">
                        {groups.map((group) => {
                            return (
                                <DroppableGroup groupData={group} key={group.id} deleteGroup={deleteGroup} />
                            )
                        })}
                    </div>
                    { isAdding ?
                        <div className="card-modal__desc-edit">
                            <IonInput
                                id="edit-textinput"
                                autofocus={true}
                                placeholder="Set new group title"
                            />
                            <div className="desc-edit__btns">
                                <IonButton onClick={() => saveChanges()} >Save</IonButton>
                                <IonButton onClick={() => cancelChanges()} fill="clear">Cancel</IonButton>
                            </div>
                        </div>
                        : null 
                    }
                </DragDropContext>
            </IonContent>
        </>
    );
}

export default ProjectBoard;