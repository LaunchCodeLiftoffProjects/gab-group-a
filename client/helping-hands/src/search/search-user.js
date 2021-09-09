import axios from "axios";

const findUserByName = async (name) => {
    const response = await fetch("http://localhost:8080/search/users?name=" + name)
    return await response.json();
}

const findUserByLocationName = async (locName) => {
    const response = await fetch("http://localhost:8080/search/users?locationName=" + locName)
    return await response.json();
}

const findUserByEmail = (email) => {
    const response = await fetch("http://localhost:8080/search/users?email=" + email)
    return await response.json();
}

export {findUserByName, findUserByEmail, findUserByLocationName} 