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
  IonCardSubtitle, 
  IonIcon,
  IonHeader,
  IonToolbar
} from "@ionic/react";
import { useEffect, useState } from "react";
import {addOutline, clipboardOutline, personOutline} from 'ionicons/icons'
import userActionAPI from "../clientAPI/userActionAPI";

const CreateAcc: React.FC<any> = (props) => {

  const [userEmail, setUserEmail]=useState("");
  const [userPass, setUserPass]=useState("");
  const [confirmPass, setConfirmPass]=useState("");
  const [isValid, setIsValid]=useState(false);
  const [errMsg1, setErrMsg1] = useState(""); //For the password field
  const [errMsg2, setErrMsg2] = useState(""); //For the confirm Password field
  const [sucessMsg, setSuccessMsg]= useState("");




  const getEmail= async ()=>{
    try{
      const data= await userActionAPI.getUserInfo();
      setUserEmail(data.email);
    }
    
    catch (err:any) {

      setErrMsg2(err.message);
    }
    
  }

  useEffect(()=>{
    getEmail();
  
  }, [])

  //Request a verification question from the server
  const changePassword = async () => {
    let isValid = true;

    if (userPass.trim() == "") {
      setErrMsg1("Required Field");
      setSuccessMsg("");
      isValid = false;
    }

    if (confirmPass.trim() == "") {
      setErrMsg2("Required Field");
      setSuccessMsg("");
      isValid = false;
    }

    if (userPass.trim() != confirmPass.trim()){
      setErrMsg2("Passwords must match!");
      setSuccessMsg("");
      isValid = false;
    }

    // if (securityAnswer.trim() == "") {
    //   setErrMsg3("Required Field");
    //   isValid = false;
    // }

    if (!isValid) return;

    try {
      const data = await userActionAPI.changePassword({password:userPass});
      setErrMsg1("");
      setErrMsg2("");
      setSuccessMsg("Successfully Changed Password")
    

    } catch (err:any) {

      setErrMsg2(err.message);
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Your Account
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Your Account</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <IonRow class="ion-justify-content-center ion-align-items-center">
                      <IonCol>
                        <IonCard>
                          <IonCardHeader>
                            <IonCardSubtitle>Linked Email:</IonCardSubtitle>
                          </IonCardHeader>
                          <IonCardContent>
                            <i>{userEmail}</i>
                          </IonCardContent>
                        </IonCard>
                      </IonCol>
            </IonRow >
            {/* <IonItem lines="none"></IonItem> */}
            <br></br>
            <IonRow class="ion-justify-content-start ion-align-items-start"><IonCol><IonTitle><h5>Change Password:</h5></IonTitle></IonCol></IonRow>
            <IonGrid>
            <IonRow class="ion-justify-content-start ion-align-items-start">
                <IonCol>
                <IonItem className={`${errMsg1==="" && 'ion-valid'} ${errMsg1!=="" && 'ion-invalid'}`}>
                  <IonLabel position="floating">Enter new password:</IonLabel>
                  <IonInput type="password" onIonInput={(e:any)=>{setUserPass(e.target.value);}}></IonInput>
                  <IonNote slot="error">{errMsg1}</IonNote>
                </IonItem>
                </IonCol>
            </IonRow>
            <IonRow class="ion-justify-content-start ion-align-items-start">
                <IonCol>
                  <IonItem className={`${errMsg2==="" && 'ion-valid'} ${errMsg2!=="" && 'ion-invalid'}`}> 
                  <IonLabel position="floating">Confirm new password:</IonLabel>
                  <IonInput type="password" onIonInput={(e:any)=>{setConfirmPass(e.target.value);}}></IonInput>
                  <IonNote slot="error">{errMsg2}</IonNote>
                  </IonItem>
                </IonCol>
            </IonRow>
            </IonGrid>
            <IonRow class="ion-justify-content-center ion-align-items-center">
                      <IonCol>
                          <IonText color="success">{sucessMsg}</IonText>
                      </IonCol>
            </IonRow>
            <IonRow class="ion-justify-content-start ion-align-items-start">
                <IonCol>
                <IonItem lines="none">
                  <IonButton onClick={()=>{changePassword()}}>Change Password</IonButton>
                </IonItem>
                </IonCol>
            </IonRow>
            <IonRow class="ion-justify-content-start ion-align-items-start">
                <IonCol>
                <IonItem lines="none">
                  <IonButton fill="outline" onClick={()=>{ /* Swap to my boards*/ }} routerLink="/MyBoards"><IonIcon icon={clipboardOutline} slot="start"></IonIcon>  My Boards </IonButton>
                </IonItem>
                </IonCol>
            </IonRow>
            <IonRow class="ion-justify-content-start ion-align-items-start">
                <IonCol>
                <IonItem lines="none">
                  <IonButton fill="outline" onClick={()=>{/* Swap to my boards*/ }} routerLink="/CreateBoard"><IonIcon icon={addOutline} slot="start"></IonIcon> Create a new board </IonButton>
                </IonItem>
                </IonCol>
            </IonRow>

            <IonRow class="ion-justify-content-start ion-align-items-start">
                <IonCol>
                <IonItem lines="none">
                  <IonButton fill="outline" onClick={()=>{ localStorage.removeItem("token"); props.changeLogin(false);}} routerLink="/">Log Out</IonButton>
                </IonItem>
                </IonCol>
            </IonRow>
                    
        </IonGrid>
      </IonContent>
    </>
  );
};

export default CreateAcc;
