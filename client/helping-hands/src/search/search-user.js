import axios from "axios";

const findUserByName = async (name) => {
    const response = await fetch("http://localhost:8080/search/users?name=" + name)
    return await response.json();
}

//is this one necessary? 
const findUserByLocationId = (id) => {

}

const findUserByLocationName = async (locName) => {
    const response = await fetch("http://localhost:8080/search/users?locationName=" + locName)
}

const findUserByEmail = (email) => {

}

export {findUserByName} 