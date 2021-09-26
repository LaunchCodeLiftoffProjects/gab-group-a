import axios from "axios";

const createUser = async (user) => {
    try {
        let response = await axios.post("http://localhost:8080/users", user);
        return response;
    } catch (err) {
        console.log(err)
        return err //this may/may not work?
    }
}

const listUsers = async () => { //may need to pass in the abort controller signal if this starts throwing that "too many requests" error. 
    try {
        let response = await fetch("http://localhost:8080/users")
        return await response.json();
    } catch (err) {
        console.log(err)
        // return err
    }
}

const oneUser = async (id) => {
    try {
        let response = await fetch("http://localhost:8080/users/" + id)
        return await response.json();
    } catch (err) {
        console.log(err)
        // return err
    }
}

const updateUser = async (user) => {
    try {
        let response = await axios.put("http://localhost:8080/users/" + user.id, user)
        return response;
    } catch (err) {
        console.log(err)
    }
}

const deleteUser = async (id) => {
    try {
        let response = await axios.delete("http://localhost:8080/users/" + id)
    } catch (err) {
        console.log(err)
    }
}

export { createUser, listUsers, updateUser, oneUser, deleteUser }
