import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
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
  IonRouterLink,
  IonNote
} from "@ionic/react";
import { useState } from "react";
import userAuthAPI from "../clientAPI/userAuthAPI"

const CantLogin: React.FC = () => {
  
  const [userEmail, setUserEmail]=useState("");
  const [errMsg1, setErrMsg1] = useState(""); //For the password field 
  const [errMsg2, setErrMsg2] = useState(""); //For the confirm Password field
  const [errMsg3, setErrMsg3] = useState(""); //For the Answer being wrong or something
  const [errMsg4, setErrMsg4] = useState(""); // For the email field 
  const [codeSent, setCodeSent]= useState(false);
  // const [securityQuestion, setSecurityQuestion] =useState("");
  const [securityQuestion, setSecurityQuestion] =useState("What was your favorite animal?");
  const [securityAnswer, setSecurityAnswer] =useState("");
  const [userPass, setUserPass]=useState("");
  const [confirmPass, setConfirmPass] =useState("");


  //Request a verification question from the server
  const requestVerHandler= async()=>{

    let isValid= true;

    if (userEmail.trim()==""){
      setErrMsg4("Required Field");
      isValid=false;
    }


    if (!isValid) return;

    try{

      const response= await userAuthAPI.requestVerification({email:userEmail});
      const data = await response.json();
      setCodeSent(true);
      setSecurityQuestion(data.securityQuestion);


    }

    catch(err){

    }

  }

  //Request the server to verify user's answer
  const verifyAnswer =async()=>{

    let isValid=true;

    if (userPass.trim()==""){
      setErrMsg1("Required Field");
      isValid=false;
    }

    if (confirmPass.trim()==""){
      setErrMsg2("Required Field");
      isValid=false;
    }

    if (userPass.trim() != confirmPass.trim()){
      setErrMsg2("Passwords must match!");
      isValid = false;
    }
    

    if (isValid==false) return;

    try{
      
      const response= await userAuthAPI.requestVerification({email:userEmail});
      const data = await response.json();
      setCodeSent(true);
      setSecurityQuestion(data.securityQuestion);

    }

    catch (err){

    }

  }

  const renderQuestion =()=>{
    
      return (
        <IonGrid>
          <IonRow class="ion-justify-content-center ion-align-items-center">
                  <IonCol>
                    <IonItem lines="none">
                      <IonLabel><IonText><b>Security Question:</b></IonText></IonLabel>
                    </IonItem>
                  </IonCol>
        </IonRow>
        <IonRow class="ion-justify-content-center ion-align-items-center">
                  <IonCol>
                    <IonItem lines="none">
                      <IonLabel>{securityQuestion}</IonLabel>
                    </IonItem>
                  </IonCol>
        </IonRow>
        <IonRow class="ion-justify-content-center ion-align-items-center">
                  <IonCol>
                    <IonItem className={`${errMsg3==="" && 'ion-valid'} ${errMsg3!==""  && 'ion-invalid'}`}>
                        <IonLabel position="floating">Answer:</IonLabel>
                        <IonInput onIonInput={(e:any)=>{setSecurityAnswer(e.target.value);}}></IonInput>
                        <IonNote slot="error">{errMsg3}</IonNote>
                    </IonItem>
                  </IonCol>
        </IonRow>
        <IonRow class="ion-justify-content-center ion-align-items-center">
                  <IonCol>
                    <IonItem className={`${errMsg1==="" && 'ion-valid'} ${errMsg1!==""  && 'ion-invalid'}`}>
                        <IonLabel position="floating">Enter new password:</IonLabel>
                        <IonInput onIonInput={(e:any)=>{setUserPass(e.target.value);}}></IonInput>
                        <IonNote slot="error">{errMsg1}</IonNote>
                    </IonItem>
                  </IonCol>
        </IonRow>
        <IonRow class="ion-justify-content-center ion-align-items-center">
                  <IonCol>
                    <IonItem className={`${errMsg2==="" && 'ion-valid'} ${errMsg2!==""  && 'ion-invalid'}`}>
                        <IonLabel position="floating">Confirm new password:</IonLabel>
                        <IonInput onIonInput={(e:any)=>{setConfirmPass(e.target.value);}}></IonInput>
                        <IonNote slot="error">{errMsg2}</IonNote>
                    </IonItem>
                  </IonCol>
        </IonRow>
        <IonRow class="ion-justify-content-center ion-align-items-center">
                  <IonCol>
                      <IonItem lines="none"><IonButton onClick={()=>{verifyAnswer()}} size="default">Reset Password</IonButton></IonItem>
                  </IonCol>
        </IonRow>
      </IonGrid>
      )
  };

  const renderEmailReset=()=>{
    return (
      <IonGrid>
      <br></br>
        <IonRow class="ion-justify-content-start ion-align-items-start"><IonCol><IonTitle>Can't Login?</IonTitle></IonCol></IonRow>
        <hr></hr>
        <IonRow class="ion-justify-content-center ion-align-items-center">
                  <IonCol>
                    <IonItem className={`${errMsg4==="" && 'ion-valid'} ${errMsg4!==""  && 'ion-invalid'}`}>
                        <IonLabel position="floating">Enter Email:</IonLabel>
                        <IonInput onIonInput={(e:any)=>{setUserEmail(e.target.value);}}></IonInput>
                        <IonNote slot="error">{errMsg4}</IonNote>
                    </IonItem>
                  </IonCol>
        </IonRow>
        <IonRow class="ion-justify-content-center ion-align-items-center">
                  <IonCol>
                      <IonItem lines="none"><IonButton onClick={()=>{requestVerHandler()}} size="default">Reset Password</IonButton></IonItem>
                  </IonCol>
        </IonRow>
        </IonGrid>
    
    )
  }

    return (
      <IonGrid>
        {/* <br></br>
        <IonRow class="ion-justify-content-start ion-align-items-start"><IonCol><IonTitle>Can't Login?</IonTitle></IonCol></IonRow>
        <hr></hr>
        <IonRow class="ion-justify-content-center ion-align-items-center">
                  <IonCol>
                    <IonItem className={`${errMsg1==="" && 'ion-valid'} ${errMsg1!==""  && 'ion-invalid'}`}>
                        <IonLabel position="floating">Enter Email:</IonLabel>
                        <IonInput onIonInput={(e:any)=>{setUserEmail(e.target.value);}}></IonInput>
                        <IonNote slot="error">{errMsg1}</IonNote>
                    </IonItem>
                  </IonCol>
        </IonRow>

        <IonRow class="ion-justify-content-center ion-align-items-center">
                  <IonCol>
                      <IonItem lines="none"><IonButton onClick={()=>{requestVerHandler()}} size="default">Reset Password</IonButton></IonItem>
                  </IonCol>
        </IonRow> */}

        {/* <IonRow class="ion-justify-content-center ion-align-items-center">
                  <IonCol>
                    <IonItem className={`${securityQuestion==="" && 'ion-valid'} ${securityQuestion!==""  && 'ion-invalid'}`}>
                        <IonLabel position="floating">Answer:</IonLabel>
                        <IonInput onIonInput={(e:any)=>{setSecurityAnswer(e.target.value);}}></IonInput>
                        <IonNote slot="error">{errMsg2}</IonNote>
                    </IonItem>
                  </IonCol>
        </IonRow>
        <IonRow class="ion-justify-content-center ion-align-items-center">
                  <IonCol>
                    <IonItem className={`${securityQuestion==="" && 'ion-valid'} ${securityQuestion!==""  && 'ion-invalid'}`}>
                        <IonLabel position="floating">Enter new password:</IonLabel>
                        <IonInput onIonInput={(e:any)=>{setUserPass(e.target.value);}}></IonInput>
                        <IonNote slot="error">{errMsg2}</IonNote>
                    </IonItem>
                  </IonCol>
        </IonRow>
        <IonRow class="ion-justify-content-center ion-align-items-center">
                  <IonCol>
                    <IonItem className={`${securityQuestion==="" && 'ion-valid'} ${securityQuestion!==""  && 'ion-invalid'}`}>
                        <IonLabel position="floating">Confirm new password:</IonLabel>
                        <IonInput onIonInput={(e:any)=>{setConfirmPass(e.target.value);}}></IonInput>
                        <IonNote slot="error">{errMsg2}</IonNote>
                    </IonItem>
                  </IonCol>
        </IonRow> */}
        {(securityQuestion=="")? renderEmailReset(): renderQuestion()}


        <hr></hr>
              <br></br>
              <IonRow class="ion-justify-content-center">
                  <IonCol>
                  <IonRouterLink routerLink="/LoginPage"><IonText color="dark">Login</IonText></IonRouterLink>
                  </IonCol>
              </IonRow>

              <IonRow class="ion-justify-content-center ion-align-items-center">
                  <IonCol>
                  <IonRouterLink routerLink="/CreateAcc"><IonText color="dark">Create Account</IonText></IonRouterLink>
                  </IonCol>
              </IonRow>

        
    </IonGrid>
        
      );
  };
  
  export default CantLogin;
  