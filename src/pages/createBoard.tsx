import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./loginPage.css";
import {
  IonButton,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
  IonItemDivider,
  IonTitle,
  IonFooter,
  IonNote,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonHeader
} from "@ionic/react";
import { useEffect, useState } from "react";
import userActionAPI from "../clientAPI/userActionAPI";

const CreateBoard: React.FC = () => {

  const [boardName, setBoardName] =useState("");
  const [collabName, setCollabName]= useState("");
  const [errMsg1, setErrMsg1] = useState(""); //For the board Field
  const [errMsg2, setErrMsg2] = useState(""); //For the collab field

  const createBoard = async () => {
    let isValid = true;

    if (boardName.trim() == "") {
      setErrMsg1("Required Field");
      isValid = false;
    }


    if (!isValid) return;

    try {
      const response = await userActionAPI.createBoard({boardName:boardName});
      const data = await response.json();

    } catch (err) {}
  };

  return (
    <IonGrid>
      <br></br>
      <IonRow class="ion-justify-content-start ion-align-items-start"><IonCol size="12"><IonTitle><h4>Create New Board</h4></IonTitle></IonCol></IonRow>
      <hr></hr>
      <IonRow class="ion-justify-content-center ion-align-items-center">
                  <IonCol>
                    <IonItem className={`${errMsg1==="" && 'ion-valid'} ${errMsg1!=="" && 'ion-invalid'}`}>
                        <IonLabel position="floating">Board Name:</IonLabel>
                        <IonInput onIonInput={(e:any)=>{setBoardName(e.target.value);}}></IonInput>
                        <IonNote slot="error">{errMsg1}</IonNote>
                    </IonItem>
                  </IonCol>
        </IonRow>
        <IonRow class="ion-justify-content-center ion-align-items-center">
                  <IonCol>
                    <IonItem className={`${errMsg2==="" && 'ion-valid'} ${errMsg2!=="" && 'ion-invalid'}`}>
                        <IonLabel position="floating">Invite Collaborators:</IonLabel>
                        <IonInput onIonInput={(e:any)=>{setCollabName(e.target.value);}}></IonInput>
                        <IonNote slot="error">{errMsg2}</IonNote>
                    </IonItem>
                  </IonCol>
        </IonRow>
        <IonRow><IonCol></IonCol></IonRow>
        <IonRow class="ion-justify-content-start ion-align-items-start">
            <IonCol>
            <IonItem lines="none">
              <IonButton color="success" onClick={()=>{createBoard()}}>Create Board</IonButton>
            </IonItem>
            </IonCol>
        </IonRow>
        
                
    </IonGrid>
  );
};

export default CreateBoard;
