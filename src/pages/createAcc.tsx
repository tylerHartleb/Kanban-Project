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
  IonRouterLink,
  IonSelect,
  IonSelectOption,
  IonList,
  IonHeader,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import userAuthAPI from "../clientAPI/userAuthAPI";

//Need to fix alert styling!!! 
const CreateAcc: React.FC = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [errMsg1, setErrMsg1] = useState(""); //For the password field
  const [errMsg2, setErrMsg2] = useState(""); //For the confirm Password field
  const [errMsg3, setErrMsg3] = useState(""); //For the email field
  const [errMsg4, setErrMsg4] = useState(""); //For the security question field
  const [errMsg5, setErrMsg5] = useState(""); //For the security answer field
  const [successMsg, setSuccessMsg]=useState(""); //For the sucess msg

  //Request a verification question from the server
  const handleCreate = async () => {
    let isValid = true;

    if (userPass.trim() == "") {
      setErrMsg1("Required Field");
      isValid = false;
    }

    if (confirmPass.trim() == "") {
      setErrMsg2("Required Field");
      isValid = false;
    }

    if (userEmail.trim() == "") {
      setErrMsg3("Required Field");
      isValid = false;
    }

    if (securityQuestion.trim() == "") {
      setErrMsg4("Required Field");
      isValid = false;
    }

    if (userPass.trim() != confirmPass.trim()){
      setErrMsg2("Passwords must match!");
      isValid = false;
    }

    // if (securityAnswer.trim() == "") {
    //   setErrMsg3("Required Field");
    //   isValid = false;
    // }

    if (!isValid) return;

    try {
      console.log(securityQuestion);
      console.log(userEmail);
      const response = await userAuthAPI.createAccount({
        name:userEmail, email: userEmail, password:userPass, securityQ:securityQuestion, securityA: securityAnswer
      });

      setErrMsg5("");
       setSuccessMsg("Account succesfully created!");


    } 
    catch (err:any) {

      setErrMsg5(err.message);

    }
  };

  return (<>
    <IonHeader>
        <IonToolbar>
          <IonTitle>
          Create Account
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Create Account</IonTitle>
          </IonToolbar>
        </IonHeader>
    <IonGrid>
      <br></br>
      {/* <IonRow class="ion-justify-content-start ion-align-items-start">
        <IonCol>
          <IonTitle>Create Account</IonTitle>
        </IonCol>
      </IonRow> */}
      <IonRow class="ion-justify-content-center ion-align-items-center">
        <IonCol>
          <IonItem
            className={`${errMsg3 === "" && "ion-valid"} ${
              errMsg3 !== "" && "ion-invalid"
            }`}
          >
            <IonLabel position="floating">Enter Email</IonLabel>
            <IonInput
              onIonInput={(e: any) => {
                setUserEmail(e.target.value);
              }}
            ></IonInput>
            <IonNote slot="error">{errMsg3}</IonNote>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow class="ion-justify-content-start ion-align-items-start">
        <IonCol>
          <IonItem
            className={`${errMsg1 === "" && "ion-valid"} ${
              errMsg1 !== "" && "ion-invalid"
            }`}
          >
            <IonLabel position="floating">Enter Password</IonLabel>
            <IonInput
              onIonInput={(e: any) => {
                setUserPass(e.target.value);
              }}
            ></IonInput>
            <IonNote slot="error">{errMsg1}</IonNote>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow class="ion-justify-content-start ion-align-items-start">
        <IonCol>
          <IonItem
            className={`${errMsg2 === "" && "ion-valid"} ${
              errMsg2 !== "" && "ion-invalid"
            }`}
          >
            <IonLabel position="floating">Confirm Password</IonLabel>
            <IonInput
              onIonInput={(e: any) => {
                setConfirmPass(e.target.value);
              }}
            ></IonInput>
            <IonNote slot="error">{errMsg2}</IonNote>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow class="ion-justify-content-start ion-align-items-start">
        <IonCol>
          {/* <IonItem
            className={`${errMsg2 === "" && "ion-valid"} ${
              errMsg2 !== "" && "ion-invalid"
            }`}
          > */}
            <IonList>
              <IonItem className={`${errMsg4 === "" && "ion-valid"} ${
              errMsg4 !== "" && "ion-invalid"
            }`}>
                <IonSelect  onIonChange ={(e:any)=>{setSecurityQuestion(e.detail.value)}} placeholder="Choose a security Question!">
                  <IonSelectOption value="What city were you born in?">What city were you born in?</IonSelectOption>
                  <IonSelectOption value="What is your oldest sibling's middle name?">What is your oldest sibling's middle name?</IonSelectOption>
                  <IonSelectOption value="What was the first concert you attended?">What was the first concert you attended?</IonSelectOption>
                  <IonSelectOption value="What was the make and model of your first car?">What was the make and model of your first car?</IonSelectOption>
                  <IonSelectOption value="In what city or town did your parents meet?">In what city or town did your parents meet?</IonSelectOption>
                </IonSelect>
                <IonNote slot="error">{errMsg4}</IonNote>
              </IonItem>
            </IonList>
            {/* <IonNote slot="error">{errMsg3}</IonNote>
          </IonItem> */}
        </IonCol>
      </IonRow>
      <IonRow class="ion-justify-content-start ion-align-items-start">
        <IonCol>
          <IonItem
            className={`${errMsg5 === "" && "ion-valid"} ${
              errMsg5 !== "" && "ion-invalid"
            }`}
          >
            <IonLabel position="floating">Answer:</IonLabel>
            <IonInput
              onIonInput={(e: any) => {
                setSecurityAnswer(e.target.value);
              }}
            ></IonInput>
            <IonNote slot="error">{errMsg5}</IonNote>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow><IonCol><IonText color="success">{successMsg}</IonText></IonCol></IonRow>
      <IonRow class="ion-justify-content-start ion-align-items-start">
        <IonCol>
          <IonItem lines="none">
            <IonButton size="default"
              onClick={() => {
                handleCreate();
              }}
            >
              Create Account
            </IonButton>
          </IonItem>
        </IonCol>
      </IonRow>
      <hr></hr>
      <br></br>
      <IonRow class="ion-justify-content-center">
        <IonCol>
          <IonRouterLink routerLink="/CantLogin">
            <IonText color="dark">Can't Login?</IonText>
          </IonRouterLink>
        </IonCol>
      </IonRow>

      <IonRow class="ion-justify-content-center ion-align-items-center">
        <IonCol>
          <IonRouterLink routerLink="/LoginPage">
            <IonText color="dark">Login</IonText>
          </IonRouterLink>
        </IonCol>
      </IonRow>
    </IonGrid>
    </IonContent>
    </>
  );
};

export default CreateAcc;
