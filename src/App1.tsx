import {
    IonApp,
    IonButton,
    IonButtons,
    IonFooter,
    IonGrid,
    IonIcon,
    IonItem,
    IonToolbar,
    setupIonicReact
  } from '@ionic/react';
  import {addOutline, clipboardOutline, personOutline} from 'ionicons/icons'
  
  /* Core CSS required for Ionic components to work properly */
  import '@ionic/react/css/core.css';
  
  /* Basic CSS for apps built with Ionic */
  import '@ionic/react/css/normalize.css';
  import '@ionic/react/css/structure.css';
  import '@ionic/react/css/typography.css';
  
  /* Optional CSS utils that can be commented out */
  /* import '@ionic/react/css/padding.css';
  import '@ionic/react/css/float-elements.css';
  import '@ionic/react/css/text-alignment.css';
  import '@ionic/react/css/text-transformation.css';
  import '@ionic/react/css/flex-utils.css';
  import '@ionic/react/css/display.css'; */
  
  /* Theme variables */
  import './theme/variables.scss';
  
  /* Custom Types */
  import { Cards, Card, Group, Members, IProject } from "./classes/KanbanClasses"
  
  /* Custom Components */
  import ProjectBoard from './components/ProjectBoard';
  import { KanbanData, KanbanGroup } from './types/KanbanTypes';
  import { Project } from './classes/Project';
  import LoginPage from './pages/loginPage';
  import CantLogin from './pages/cantLogin';
  import CreateAcc from './pages/createAcc';
  import MyAccount from './pages/myAccount';
  import CreateBoard from './pages/createBoard';
  
  const cards = new Cards([new Card("card1", "<Draggable 1 />"), new Card("card2", "<Draggable 2 />")])
  const group = new Group("group-1", "group1");
  group.cards = cards;
  
  const project = new Project("Test-Board");
  project.groups.push(group);
  
  
  setupIonicReact();
  
  const App: React.FC = () => {
  
      return(
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
              {/* <IonFooter mode="md"><IonToolbar><IonButtons>         
                  <IonButton> <IonIcon icon={clipboardOutline} slot="start"></IonIcon></IonButton>
                  <IonButton> <IonIcon icon={addOutline} slot="start"></IonIcon></IonButton>
                  <IonButton> <IonIcon icon={personOutline} slot="start"></IonIcon></IonButton>
              </IonButtons></IonToolbar></IonFooter> */}
              <IonFooter mode="md"><IonButtons>         
                  <IonButton onClick={()=>{}}> <IonIcon icon={clipboardOutline} slot="start"></IonIcon></IonButton>
                  <IonButton onClick={()=>{}}> <IonIcon icon={addOutline} slot="start"></IonIcon></IonButton>
                  <IonButton onClick={()=>{}}> <IonIcon icon={personOutline} slot="start"></IonIcon></IonButton>
              </IonButtons></IonFooter>
          </IonApp>
      );
  } 
  
  export default App;
  