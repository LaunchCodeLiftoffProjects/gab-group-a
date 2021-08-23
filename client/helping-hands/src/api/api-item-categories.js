const listItemCategories = async () => { 
    try{
        let response = await fetch("http://localhost:8080/item-categories")
        return await response.json();
    } catch(err) {
        console.log(err)
        // return err
    }
}

const oneItemCategory = async (id) => {
    try {
        let response = await fetch("http://localhost:8080/item-categories/" + id)
        return await response.json();
    } catch(err) {
        console.log(err)
        // return err
    }
}

export {listItemCategories, oneItemCategory}