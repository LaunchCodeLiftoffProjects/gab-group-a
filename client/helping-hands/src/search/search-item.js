const findItemByName = async name => {
    const response = await fetch("http://localhost:8080/search/items?name=" + name)
    return await response.json();
}

const findItemByCategory = async category => {
    const response = await fetch("http://localhost:8080/search/items?category=" + category)
    return await response.json()
}

export {findItemByCategory, findItemByName}