import {
    IonApp,
    IonButton,
    IonButtons,
    IonFooter,
    IonGrid,
    IonIcon,
    IonItem,
    IonToolbar,
    setupIonicReact,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonLabel,
    IonContent,
  } from "@ionic/react";
  import { addOutline, clipboardOutline, personOutline } from "ionicons/icons";
  import { IonReactRouter } from "@ionic/react-router";
  
  import { Redirect, Route } from "react-router";
  
  /* Core CSS required for Ionic components to work properly */
  import "@ionic/react/css/core.css";
  
  /* Basic CSS for apps built with Ionic */
  import "@ionic/react/css/normalize.css";
  import "@ionic/react/css/structure.css";
  import "@ionic/react/css/typography.css";
  
  /* Optional CSS utils that can be commented out */
  import "@ionic/react/css/padding.css";
  import "@ionic/react/css/float-elements.css";
  import "@ionic/react/css/text-alignment.css";
  import "@ionic/react/css/text-transformation.css";
  import "@ionic/react/css/flex-utils.css";
  import "@ionic/react/css/display.css";
  
  /* Theme variables */
  import "./theme/variables.scss";
  
  /* Custom Types */
  import { Cards, Card, Group, Members, IProject } from "./classes/KanbanClasses";
  
  /* Custom Components */
  import ProjectBoard from "./components/ProjectBoard";
  import { KanbanData, KanbanGroup } from "./types/KanbanTypes";
  import { Project } from "./classes/Project";
  import LoginPage from "./pages/loginPage";
  import CantLogin from "./pages/cantLogin";
  import CreateAcc from "./pages/createAcc";
  import MyAccount from "./pages/myAccount";
  import CreateBoard from "./pages/createBoard";
  import MyBoards from "./pages/MyBoards";
  import { useEffect } from "react";
  
  const cards = new Cards([
    new Card("card1", "<Draggable 1 />"),
    new Card("card2", "<Draggable 2 />"),
  ]);
  const group = new Group("group-1", "group1");
  group.cards = cards;
  
  const project = new Project("Test-Board");
  project.groups.push(group);
  
  setupIonicReact();
  
  const App: React.FC = () => {
      useEffect(()=>{
          console.log("Hello")
      })
    return (
      <IonApp>
        <div className="container">
          {/* <ProjectBoard title={project.title} groups={project.groups} members={project.members}  /> */}
          {/* <LoginPage/> */}
          {/* {<CantLogin></CantLogin>} */}
          {/* <CreateAcc></CreateAcc> */}
          {/* <MyBoards/>*/}
          {/* <MyAccount></MyAccount> */}
          {/* <CreateBoard></CreateBoard> */}
        </div>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/MyBoards">
                <IonContent>
                  <MyBoards />
                </IonContent>
              </Route>
              <Route exact path="/CreateBoard">
                <IonContent>
                  <CreateBoard />
                </IonContent>
              </Route>
              <Route path="/MyAccount">
                <IonContent>
                  <MyAccount />
                </IonContent>
              </Route>
              <Route exact path="/">
                <Redirect to="/MyBoards" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton
                mode="md"
                disabled={false}
                tab="MyBoards"
                href="MyBoards"
              >
                <IonIcon icon={clipboardOutline} />
                <IonLabel>My Boards</IonLabel>
              </IonTabButton>
              <IonTabButton
                disabled={false}
                tab="CreateBoard"
                href="/CreateBoard"
              >
                <IonIcon icon={addOutline} />
                <IonLabel>Create new Board</IonLabel>
              </IonTabButton>
              <IonTabButton disabled={false} tab="MyAccount" href="/MyAccount">
                <IonIcon icon={personOutline} />
                <IonLabel>My Account</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    );
  };
  
  export default App;
  