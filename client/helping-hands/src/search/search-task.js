const findTaskByName = name => {
    const response = await fetch("http://localhost:8080/search/tasks?name=" + name)
    return await response.json();
}

const findTaskByCategory = category => {
    const response = await fetch("http://localhost:8080/search/tasks?category=" + category)
    return await response.json()
}

export {findTaskByCategory, findTaskByName}