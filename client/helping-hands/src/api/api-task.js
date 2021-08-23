import axios from "axios";

const createTask = async (task) => {
    try{
        let response = await axios.post("http://localhost:8080/tasks", task);
        return await response.json();
    } catch(err) {
        console.log(err)
        return err //this may/may not work?
    }
}

const listTasks = async () => { //may need to pass in the abort controller signal if this starts throwing that "too many requests" error. 
    try{
        let response = await fetch("http://localhost:8080/tasks")
        return await response.json();
    } catch(err) {
        console.log(err)
        // return err
    }
}

const oneTask = async (id) => {
    try {
        let response = await fetch("http://localhost:8080/tasks/" + id)
        return await response.json();
    } catch(err) {
        console.log(err)
        // return err
    }
}

const updateTask = async (task) => {
    try {
        let response = await axios.put("http://localhost:8080/tasks/" + task.id, task)
        return response.json();
    } catch(err) {
        console.log(err)
    }
}

const deleteTask = async (id) => {
    try {
        let response = await axios.delete("http://localhost:8080/tasks/" + id)
    } catch(err) {
        console.log(err)
    }
}

export {createTask, listTasks, updateTask, oneTask, deleteTask}
