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
  IonHeader,
  IonToolbar
} from "@ionic/react";
import { useEffect, useState } from "react";
import userActionAPI from "../clientAPI/userActionAPI";

const CreateBoard: React.FC = () => {

  const [boardName, setBoardName] = useState("");
  const [collabName, setCollabName]= useState("");
  const [errMsg1, setErrMsg1] = useState(""); //For the board Field
  const [errMsg2, setErrMsg2] = useState(""); //For the collab field
  const [boardCreated, setBoardCreated] = useState(false); //Check if board has been created - for invite collab functonality
  const [successMsg1, setSuccessMsg1]=useState("");
  const [successMsg2, setSuccessMsg2]=useState("");


  const UpdateErrorSucess=(err1="", err2="", succ1="", succ2="")=>{
    setErrMsg1(err1);
    setErrMsg2(err2);
    setSuccessMsg1(succ1);
    setSuccessMsg2(succ2);

  }


  const createBoard = async () => {
    let isValid = true;
    let err1="";
    let err2="";
    let succ1="";
    let succ2="";
    let boardId="";
    

    if (boardName.trim() == "") {
      
      isValid = false;
      err1="Required Field!";
    }

    if (!isValid) { UpdateErrorSucess(err1, err2, succ1, succ2); return;} 

    try {
      //First create the board
      const data = await userActionAPI.createBoard({boardName:boardName});
      // console.log(data)
      boardId=data._id;
      setBoardCreated(true);
      //And then invite collabs to it
      succ1="Board Sucessfully created!";
      err1="";
      err2="";
      UpdateErrorSucess(err1, err2, succ1, succ2)
      // await sendInvites();
         
      } 
    catch (err:any) {
      err1=err.msg;
    }

    finally{
      // console.log("Jello");
      // console.log(err1, err2, succ1, succ2);
      console.log(boardId);
      UpdateErrorSucess(err1, err2, succ1, succ2);
      await sendInvites(boardId);
    }
    
  };

  const sendInvites= async (boardId:any) =>{

    let emailList= emailSplitter(collabName);
    console.log("EmailList", emailList);
    let errorIndex=[];
    console.log(emailList.length);
      
      for (let i=0; i<emailList.length;){

        try{
          console.log(emailList[i]);
          let data1= await userActionAPI.inviteCollaborator(boardId, {email: emailList[i] });
          i++;
          console.log(data1);
        }
        catch (err1:any) {
          errorIndex.push(i);
          console.log(err1);
          i++;
          continue;
        }
        
      }
      
    console.log(errorIndex);
    // try{
    //   const data1= await userActionAPI.inviteCollaborator(boardId, {email: emailList[0] });
    //   console.log(data1);

    // }

    // catch (err1:any){
    //   console.log(err1);
    // }
    
  }

 
  const emailSplitter=(emails:any)=>{
    const constEmailList= emails.trim().split(/\s+/);
    return constEmailList;  
  }


  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Create New Board
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Create New Board</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
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
                            <IonLabel position="floating">Invite Collaborator:</IonLabel>
                            <IonInput onIonInput={(e:any)=>{setCollabName(e.target.value);}}></IonInput>
                            <IonNote slot="error">{errMsg2}</IonNote>
                        </IonItem>
                      </IonCol>
            </IonRow>
            <IonRow class="ion-justify-content-center ion-align-items-center">
                  <IonCol>
                      <IonText color="success">{successMsg1}</IonText>
                  </IonCol>
            </IonRow>
            <IonRow class="ion-justify-content-center ion-align-items-center">
                  <IonCol>
                      <IonText color="success">{successMsg2}</IonText>
                  </IonCol>
            </IonRow>
            <IonRow><IonCol></IonCol></IonRow>
            <IonRow class="ion-justify-content-start ion-align-items-start">
                <IonCol>
                <IonItem lines="none">
                  <IonButton size= "default" color="success" onClick={()=>{createBoard()}}>Create Board</IonButton>
                </IonItem>
                </IonCol>
            </IonRow>
            
            
                    
        </IonGrid>
      </IonContent>
    </>
  );
};

export default CreateBoard;
