const listTaskCategories = async () => { 
    try{
        let response = await fetch("http://localhost:8080/task-categories")
        return await response.json();
    } catch(err) {
        console.log(err)
        // return err
    }
}

const oneTaskCategory = async (id) => {
    try {
        let response = await fetch("http://localhost:8080/task-categories/" + id)
        return await response.json();
    } catch(err) {
        console.log(err)
        // return err
    }
}

export {listTaskCategories, oneTaskCategory} 