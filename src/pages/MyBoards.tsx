import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonNote,
  IonRow,
  IonSearchbar,
  IonText,
  IonTitle,
  IonToolbar,
  IonRefresher,
  IonRefresherContent,
  IonNav,
  IonNavLink,
  IonPage,
  IonApp,
  IonSpinner,
} from "@ionic/react";
import { RefresherEventDetail } from "@ionic/core"
import { trashOutline } from 'ionicons/icons';
import { useEffect, useState, useRef, createContext, useCallback } from "react";

// #region Classes & Types
import { KanbanData, KanbanGroup } from "../types/KanbanTypes";

import { Cards, Card, Group, Members, IProject } from "../classes/KanbanClasses";
import { Project } from "../classes/Project";
// #endregion

// #region SCSS
import "./MyBoards.scss";
// #endregion

// #region Custom components
import ProjectBoard from "../components/ProjectBoard";
// #endregion

import { getBoards, deleteBoard } from "../clientAPI/boardActionAPI";
import userActionAPI from "../clientAPI/userActionAPI";

export const PageContext = createContext(null as HTMLElement | null);

const MyBoards: React.FC = () => {

  return (
    <>
      <IonNav root={() => <MyBoardsPage />} />
    </>
  );
};

const MyBoardsPage: React.FC = () => {
  const [boards, setBoards] = useState([] as Project[]);
  const [results, setResults] = useState([] as Project[]);
  const [user, setUser] = useState({} as any);

  // #region Handlers
  const handleSearch = (ev: Event) => {
    let query = "";
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) query = target.value!.toLowerCase();
    console.log(query)

    setResults(boards.filter(({ title }) => title.toLowerCase().indexOf(query) > -1));
  }

  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    setTimeout(() => {
      // Any calls to load data go here
      event.detail.complete();
    }, 2000);
  }

  const deleteSelBoard = (id: string) => {
    deleteBoard(id);
    const nav = document.querySelector('ion-nav');
    const newBoards = boards.filter(board => (board.id != id));
    setBoards(newBoards);
    setResults(newBoards);
    nav?.pop();
  }

  const fetchData = useCallback(async () => {
    const data = await getBoards();
    const userData = await userActionAPI.getUserInfo();
    const boards: Project[] = data.map((board: { _id: string; title: string; owner: string; __v: number }) => {
      return new Project(board._id, board.title, board.owner);
    });
  
    setBoards(boards);
    setUser(userData);
    setResults(boards);
  }, [])

  // #region Hooks
  useEffect(() => {
    fetchData().catch();
  }, []);
  // #endregion

  return (
    <>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>Your Boards</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Your Boards</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar className="collapsible" debounce={250} onIonChange={(event) => handleSearch(event)}></IonSearchbar>
          </IonToolbar>
        </IonHeader>
        
        <IonList>
          { results.map((project, index) => (
            <IonNavLink
              data-search={project.title} 
              routerDirection="forward"
              key={index}
              component={() => <ProjectBoard id={project.id} title={project.title} groups={project.groups} owner={project.owner} deleteSelBoard={deleteSelBoard} />}
            >
              <IonCard button={true}>
                <IonCardHeader className="board-header">
                  <IonCardTitle>{project.title}</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonNavLink>
          ))}
        </IonList>
      </IonContent>
    </>
  )
}

export default MyBoards;
