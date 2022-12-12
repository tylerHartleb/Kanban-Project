const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify("")
  };
  
  const userActionAPI = {
    changePassword: async (param:any) => {JSON.stringify(param); return await fetch("", requestOptions);},
    createBoard: async (param:any) => {JSON.stringify(param); return await fetch("", requestOptions);},
  }
  
  export default userActionAPI