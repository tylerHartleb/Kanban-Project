const requestOptionsPost = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization':'Bearer 1'},
    body: JSON.stringify("")
  };


  const requestOptionsGet = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization':'' },
  };

  const setToken =()=>{
    // console.log(localStorage.getItem("token"));
    // let token=JSON.parse(localStorage.getItem("token")!)
    let token = localStorage.getItem("token");
    // console.log(token);
    requestOptionsGet.headers['Authorization']= `Bearer ${token}` ;
    requestOptionsPost.headers['Authorization']= `Bearer ${token}`;
  }
  
  const userActionAPI = {
    changePasswordToken: async (token:any, param:any) => {
      let temp =JSON.stringify(param);
      // let temp=param;
      requestOptionsPost.body=temp;
      requestOptionsPost.headers.Authorization=`Bearer ${token}`; 
      const response= await fetch("http://localhost:5000/api/users/me/", requestOptionsPost);
      const data= await response.json();
      console.log(response);
      console.log(data);
      if (response.ok==false) {throw new Error(data.message)};
      return data;
    }, 
    changePassword:  async (param:any) => {
      let temp =JSON.stringify(param);
      // let temp=param;
      requestOptionsPost.body=temp;
      setToken();
      const response= await fetch("http://localhost:5000/api/users/me/", requestOptionsPost);
      const data= await response.json();
      console.log(response);
      console.log(data);
      if (response.ok==false) {throw new Error(data.message)};
      return data;
    },
    createBoard: async (param:any) => {
      let temp =JSON.stringify(param);
      requestOptionsPost.body=temp;
      setToken();
      const response = await fetch('http://localhost:5000/api/boards', requestOptionsPost);
      const data = await response.json();
      // console.log(response);
      // console.log(data);
      if (response.ok==false) {throw new Error(data.message)};
      return data;
    },

    //Takes in email in parmas
    inviteCollaborator: async (boardId:any, param:any) => {
      let temp =JSON.stringify(param);
      console.log("Params passed: ", temp);
      console.log(boardId);
      requestOptionsPost.body=temp;
      setToken();
      const response = await fetch(`http://localhost:5000/api/boards/invite/${boardId}`, requestOptionsPost);
      console.log(response);
      const data = await response.json();
      console.log(response);
      console.log(data);
      if (response.ok==false) {throw new Error(data.message)};
      return data;
    },

    getUserInfo: async () => {
      // let temp=param;
      setToken();
      const response= await fetch("http://localhost:5000/api/users/me/", requestOptionsGet);
      const data= await response.json();
      console.log(response);
      console.log(data);
      if (response.ok==false) {throw new Error(data.message)};
      return data;
    },
  }
  
  export default userActionAPI