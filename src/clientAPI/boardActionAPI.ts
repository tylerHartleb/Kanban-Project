const requestOptionsPost = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization':'Bearer 1'},
    body: JSON.stringify("")
};

const requestOptionsGet = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization':'' },
};

const requestOptionsDelete = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'Authorization':'' },
};

const requestOptionsPut = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization':'' },
    body: JSON.stringify("")
};

const setToken = () =>{
    console.log(localStorage.getItem("token"));
    // let token=JSON.parse(localStorage.getItem("token")!)
    let token=localStorage.getItem("token");
    console.log(token);
    requestOptionsGet.headers['Authorization']= `Bearer ${token}` ;
    requestOptionsPost.headers['Authorization']= `Bearer ${token}`;
    requestOptionsDelete.headers['Authorization']= `Bearer ${token}`;
    requestOptionsPut.headers['Authorization']= `Bearer ${token}`;
}

export async function getBoards() {
    setToken();
    const response = await fetch("http://localhost:5000/api/boards", requestOptionsGet);
    const data= await response.json();
    if (response.ok==false) {throw new Error(data.message)};
    return data;
}

export async function getGroups(id: string) {
    setToken();
    const response = await fetch(`http://localhost:5000/api/taskLists/collections/${id}`, requestOptionsGet);
    const data= await response.json();
    if (response.ok==false) {throw new Error(data.message)};
    return data;
}

export async function addGroup(id: string, params: any) {
    setToken();
    const postData = { ...requestOptionsPost, body: JSON.stringify(params) }
    const response = await fetch(`http://localhost:5000/api/taskLists/${id}`, postData);
    const data = await response.json();
    console.log(response);
    console.log(data);
    if (response.ok==false) {throw new Error(data.message)};
    return data;
}

export async function getTasks(id: string) {
    setToken();
    const response = await fetch(`http://localhost:5000/api/tasks/collections/${id}`, requestOptionsGet);
    const data= await response.json();
    if (response.ok==false) {throw new Error(data.message)};
    return data;
}

export async function createTask(id: string, params: any) {
    setToken();
    const postData = { ...requestOptionsPost, body: JSON.stringify(params) }
    const response = await fetch(`http://localhost:5000/api/tasks/${id}`, postData);
    const data = await response.json();
    if (response.ok==false) {throw new Error(data.message)};
    return data;
}

export async function deleteTask(id: string) {
    setToken();
    const response = await fetch(`http://localhost:5000/api/tasks/${id}`, requestOptionsDelete);
    const data = await response.json();
    if (response.ok==false) {throw new Error(data.message)};
    return data;
}

export async function updateTask(id: string, params: { taskList?: string, title?: string, description?: string, position?: number }) {
    setToken();
    const postData = { ...requestOptionsPut, body: JSON.stringify(params) }
    const response = await fetch(`http://localhost:5000/api/tasks/${id}`, postData);
    const data = await response.json();
    if (response.ok==false) {throw new Error(data.message)};
    return data;
}