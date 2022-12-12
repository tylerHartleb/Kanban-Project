const requestOptionsPost = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(""),
};


const requestOptionsGet = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(""),
};

const userAuthAPI = {
  createAccount: async (param:any) => {let temp =JSON.stringify(param); console.log(temp); requestOptionsPost.body=temp; return await fetch("localhost/api/users", requestOptionsPost);},
  login: async (param:any) => {let temp=JSON.stringify(param); return await fetch("", requestOptionsPost);},
  requestVerification: async (param:any) => {let temp=JSON.stringify(param); return await fetch("", requestOptionsPost);},
  verifyAnswer: async (param:any) => {let temp=JSON.stringify(param); return await fetch("", requestOptionsPost);}, 
}

export default userAuthAPI