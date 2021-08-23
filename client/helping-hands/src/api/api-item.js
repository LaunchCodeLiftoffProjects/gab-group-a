import axios from "axios";

const createItem = async (item) => {
    try{
        let response = await axios.post("http://localhost:8080/items", item);
        return response;
    } catch(err) {
        console.log(err)
        return err //this may/may not work?
    }
}

const listItems = async () => { //may need to pass in the abort controller signal if this starts throwing that "too many requests" error. 
    try{
        let response = await fetch("http://localhost:8080/items")
        return await response.json();
    } catch(err) {
        console.log(err)
        // return err
    }
}

const oneItem = async (id) => {
    try {
        let response = await fetch("http://localhost:8080/items/" + id)
        return await response.json();
    } catch(err) {
        console.log(err)
        // return err
    }
}

const updateItem = async (item) => {
    try {
        let response = await axios.put("http://localhost:8080/items/" + item.id, item)
        return response;
    } catch(err) {
        console.log(err)
    }
}

const deleteItem = async (id) => {
    try {
        let response = await axios.delete("http://localhost:8080/items/" + id)
    } catch(err) {
        console.log(err)
    }
}

export {createItem, listItems, updateItem, oneItem, deleteItem}
