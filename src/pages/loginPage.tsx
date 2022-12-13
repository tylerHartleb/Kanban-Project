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
  IonNote,
  IonIcon,
  IonRouterLink
} from "@ionic/react";
import {logoGoogle} from 'ionicons/icons'
import React, { useEffect, useState } from "react";
import userAuthAPI from "../clientAPI/userAuthAPI"
import { useHistory } from "react-router";
import "./loginPage.css"


const LoginPage: React.FC<any> = (props:any) => {

  const [userEmail, setUserEmail]=useState("");
  const [userPass, setUserPass]=useState("");
  const [errMsg1, setErrMsg1]=useState("");
  const [errMsg2, setErrMsg2] = useState("");
  const history = useHistory();

  //Checks if the input is valid, if its invalid set error message accordingly
  const loginHandler= async()=>{

    let isValid= true;

    if (userEmail.trim()==""){
      setErrMsg1("Required Field");
      isValid=false;
    }

    if (userPass.trim()==""){
      setErrMsg2("Required Field");
      isValid=false;
    }

    if (!isValid) return;
    
    

    try{

      const data= await userAuthAPI.login({email:userEmail, password:userPass});
      localStorage.setItem('token', data.token)
      console.log(props);
      props.props(true);
      history.push("/");
      //Redirect 
      // history.push("/CantLogin"); // Programmaticaly navigate
      //And change is Logged in



    }

    catch(err:any){
      
      // console.log(err)
      setErrMsg2(err.message);

    }

  }


  return (
    // <IonContent fullscreen className="ion-padding">
          <IonGrid >
            <br></br>
            <IonRow class="ion-justify-content-start ion-align-items-start"><IonCol><IonTitle>Login to Managerization</IonTitle></IonCol></IonRow>
            <hr></hr>
              <IonRow class="ion-justify-content-center ion-align-items-center">
                  <IonCol>
                    <IonItem className={`${errMsg1==="" && 'ion-valid'} ${errMsg1!==""  && 'ion-invalid'}`}>
                        <IonLabel position="floating">Enter Email</IonLabel>
                        <IonInput onIonInput={(e:any)=>{setUserEmail(e.target.value);}}></IonInput>
                        <IonNote slot="error">{errMsg1}</IonNote>
                    </IonItem>
                  </IonCol>
              </IonRow>

              <IonRow class="ion-justify-content-center ion-align-items-center">
                  <IonCol>
                    <IonItem className={`${errMsg2==="" && 'ion-valid'} ${errMsg2!==""&& 'ion-invalid'}`}>
                    <IonLabel position="floating">Enter Password</IonLabel>
                      <IonInput type="password" onIonInput={(e:any)=>{setUserPass(e.target.value);}}></IonInput>
                      <IonNote slot="error">{errMsg2}</IonNote>
                    </IonItem>
                  </IonCol>
              </IonRow>
              <br></br>
              <IonRow class="ion-justify-content-center ion-align-items-center">
                  <IonCol>
                      <IonItem lines="none"><IonButton size="default" onClick={()=>{loginHandler()}}>Login</IonButton></IonItem>
                  </IonCol>
              </IonRow>              
              {/* <IonItemDivider className="botDivider"></IonItemDivider> */}
              <hr></hr>
              <br></br>
              <IonRow class="ion-justify-content-center">
                  <IonCol>
                  <IonRouterLink routerLink="/CantLogin"><IonText color="dark">Can't Login?</IonText></IonRouterLink>
                  </IonCol>
              </IonRow>

              <IonRow class="ion-justify-content-center ion-align-items-center">
                  <IonCol>
                  <IonRouterLink routerLink="/CreateAcc"><IonText color="dark">Create Account</IonText></IonRouterLink>
                  </IonCol>
              </IonRow>
              
          </IonGrid>
      //  </IonContent>
  );
};

export default LoginPage;
