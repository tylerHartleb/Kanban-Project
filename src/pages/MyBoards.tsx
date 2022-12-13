import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
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
  IonApp
} from "@ionic/react";
import { RefresherEventDetail } from "@ionic/core"
import { useEffect, useState, useRef, createContext } from "react";

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

// #region dummy data

const projects: Project[] = [];

const cards1 = new Cards([new Card("card1", "card1"), new Card("card2", "card2")])
const group1 = new Group("group-1", "group1");
group1.cards = cards1;

const project1 = new Project("SENG513");
project1.groups.push(group1);
projects.push(project1)

const cards2 = new Cards([new Card("card1", "card1"), new Card("card2", "card2")])
const group2 = new Group("group-1", "group1");
group2.cards = cards2;

const cards3 = new Cards([new Card("card3", "card3"), new Card("card4", "card4")])
const group3 = new Group("group-2", "group2");
group3.cards = cards3;

const project2 = new Project("CPSC584");
project2.groups.push(group2);
project2.groups.push(group3);
projects.push(project2)

// #endregion

export const PageContext = createContext(null as HTMLElement | null);

const MyBoards: React.FC = () => {
  // const page = useRef(null);
  // const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);

  
  
  

  // // #region Effects
  // useEffect(() => {
  //   setPresentingElement(page.current);
  // }, []);
  // #endregion

  return (
    // <IonPage ref={page}>
    //   <PageContext.Provider value={presentingElement}>
        <IonNav root={() => <MyBoardsPage />} />
    //   </PageContext.Provider>
    // </IonPage>
  );
};

const MyBoardsPage: React.FC = () => {
  const [results, setResults] = useState([...projects]);
  // useEffect(()=>{
  //   console.log("hello from your boards")
  // }, [])

  // #region Handlers
  const handleSearch = (ev: Event) => {
    let query = "";
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) query = target.value!.toLowerCase();
    console.log(query)

    setResults(projects.filter(({ title }) => title.toLowerCase().indexOf(query) > -1));
  }

  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    setTimeout(() => {
      // Any calls to load data go here
      event.detail.complete();
    }, 2000);
  }
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
              component={() => <ProjectBoard title={project.title} groups={project.groups} members={project.members} />}
            >
              <IonCard button={true}>
                <IonCardHeader>
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
