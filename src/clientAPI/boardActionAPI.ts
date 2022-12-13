const requestOptionsPost = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization':'Bearer 1'},
    body: JSON.stringify("")
};

const requestOptionsGet = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization':'' },
};

const setToken = () =>{
    console.log(localStorage.getItem("token"));
    // let token=JSON.parse(localStorage.getItem("token")!)
    let token=localStorage.getItem("token");
    console.log(token);
    requestOptionsGet.headers['Authorization']= `Bearer ${token}` ;
    requestOptionsPost.headers['Authorization']= `Bearer ${token}`;
}

export async function getBoards() {
    setToken();
    const response = await fetch("http://localhost:5000/api/boards", requestOptionsGet);
    const data= await response.json();
    console.log(response);
    console.log(data);
    if (response.ok==false) {throw new Error(data.message)};
    return data;
}