const requestOptionsPost = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization':'Bearer 1'},
    body: JSON.stringify("")
  };


  const requestOptionsGet = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization':'' },
    body: JSON.stringify("")
  };

  const setToken =()=>{
    let token=JSON.parse(localStorage.getItem("token")!)
    requestOptionsGet.headers['Authorization']= `Bearer ${token}`
    requestOptionsPost.headers['Authorization']= `Bearer ${token}`
  }
  
  const userActionAPI = {

    changePasswordToken: async (token:any, param:any) => {
      let temp =JSON.stringify(param);
      // let temp=param;
      requestOptionsPost.body=temp;
      requestOptionsPost.headers.Authorization=`Bearer ${token}`; 
      const response= await fetch("http://localhost:5000/api/users/me/", requestOptionsGet);
      const data= await response.json();
      console.log(response);
      console.log(data);
      if (response.ok==false) {throw new Error(data.message)};
      return data;
    }, 
    changePassword: async (param:any) => {JSON.stringify(param); return await fetch("", requestOptionsPost);},
    createBoard: async (param:any) => {JSON.stringify(param); return await fetch("", requestOptionsPost);},
    getUserInfo: async ()=>{ setToken() ; return await fetch ("/api/users/me", requestOptionsGet);}
  }
  
  export default userActionAPI