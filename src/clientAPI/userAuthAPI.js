const requestOptionsPost = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: "",
};


const requestOptionsGet = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  body: "",
};

const userAuthAPI = {

  createAccount: async (param) => {

    let temp =JSON.stringify(param);
      // let temp=param;
      requestOptionsPost.body=temp;
      const response= await fetch("http://localhost:5000/api/users/", requestOptionsPost);
      const data= await response.json();
      if (response.ok==false) {throw new Error(data.message)};
      return data;
      
  },

  login: async (param) => {
    let temp =JSON.stringify(param);
    // let temp=param;
    requestOptionsPost.body=temp;
    const response= await fetch("http://localhost:5000/api/users/login/", requestOptionsPost);
    const data= await response.json();
    if (response.ok==false) {throw new Error(data.message)};
    return data;
    
  },

  //Request security question using email
  requestVerification: async (param) => {
    let temp =JSON.stringify(param);
    // let temp=param;
    requestOptionsGet.body=temp;
    const response= await fetch("http://localhost:5000/api/users/recovery/", requestOptionsGet);
    const data= await response.json();
    console.log(response);
    console.log(data);
    if (response.ok==false) {throw new Error(data.message)};
    return data;
    
  },

  verifyAnswer: async (param) => {
    let temp =JSON.stringify(param);
    // let temp=param;
    requestOptionsGet.body=temp;
    const response= await fetch("http://localhost:5000/api/users/recovery/", requestOptionsGet);
    const data= await response.json();
    console.log(response);
    console.log(data);
    if (response.ok==false) {throw new Error(data.message)};
    return data;
  }
}

export default userAuthAPI