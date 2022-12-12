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
  IonCardSubtitle
} from "@ionic/react";
import { useEffect, useState } from "react";

const MyBoards: React.FC = () => {

  const [userEmail, setUserEmail]=useState("TestEmail@gmail.com");
  const [userPass, setUserPass]=useState("");
  const [confirmPass, setConfirmPass]=useState("");
  const [isValid, setIsValid]=useState(false);
  const [errorMsg, setErrorMsg]=useState("");

  useEffect(()=>{
    if (userPass==confirmPass&& userPass!=""){
        setIsValid(true);
    }
    else{
      setIsValid(false);
    }
  }, [userPass, confirmPass]);

  const handleCreate= ()=>{
    console.log("Creating Account")
    if (isValid){
      //Tell server
      console.log("isValid");
    }
    else{
      setErrorMsg("Your passwords must match!");
    }
  };

  return (
    <IonGrid>
      <br></br>
      <IonRow class="ion-justify-content-start ion-align-items-start"><IonCol><IonTitle><h4>Your Boards</h4></IonTitle></IonCol></IonRow>
    <hr></hr>
    </IonGrid>
  );
};

export default MyBoards;
