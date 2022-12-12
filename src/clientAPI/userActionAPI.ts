const requestOptionsPost = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Bearer Token':''},
    body: JSON.stringify("")
  };


  const requestOptionsGet = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Bearer Token':'' },
    body: JSON.stringify("")
  };

  const setToken =()=>{
    requestOptionsGet.headers["Bearer Token"]= JSON.parse(localStorage.getItem("token")!)
    requestOptionsPost.headers["Bearer Token"]= JSON.parse(localStorage.getItem("token")!)
  }
  
  const userActionAPI = {
    changePassword: async (param:any) => {JSON.stringify(param); return await fetch("", requestOptionsPost);},
    createBoard: async (param:any) => {JSON.stringify(param); return await fetch("", requestOptionsPost);},
    getUserInfo: async ()=>{ setToken() ; return await fetch ("localhost/api/users/me", requestOptionsGet);}
  }
  
  export default userActionAPI