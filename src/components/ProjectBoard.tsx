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
    IonInput
} from '@ionic/react';
import { cogOutline, addOutline } from 'ionicons/icons';
/* Import Custom components/types */
import DroppableGroup from "./DroppableGroup";

import { reorder } from '../scripts/movement-utils';
import { Card, Cards, Group, IProject } from "../classes/KanbanClasses";
import { addGroup, getGroups, getTasks, updateTask } from "../clientAPI/boardActionAPI";

import "./ProjectBoard.scss";
import { getDefaultNormalizer } from "@testing-library/react";

const ProjectBoard: React.FC<IProject> = ({ id, title, owner }) => {
    const [groups, updateGroups] = useState([] as Group[]);
    const [isAdding, setIsAdding] = useState(false);

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
        console.log(response);

        await fetchData();
        
        setIsAdding(false);
    }

    const fetchData = useCallback(async () => {
        const data = await getGroups(id);
    
        const groups: Group[] = data.map((group: { _id: string; title: string; }) => {
          return new Group(group._id, group.title);
        });

        Promise.all(
            groups.map(async (group) => {
                const taskData = await getTasks(group.id);
                taskData.sort((a:any,b:any) => a.position - b.position);

                const tasks = taskData.map((task: { title: string, description: string, _id: string, creator: string }) => {
                    return new Card(task._id, task.title, task.creator, task.description)
                })

                group.cards = tasks;
                return group;
            })
        ).then(() => {
            updateGroups(groups)
        })
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
                        <IonButton fill="clear" onClick={() => setIsAdding(true)}>
                            <IonIcon slot="icon-only" icon={addOutline}></IonIcon>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="project-board">
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <div className="board-content">
                        {groups.map((group) => {
                            return (
                                <DroppableGroup groupData={group} key={group.id} />
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