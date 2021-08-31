import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';
import { TextField, Typography } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { FormHelperText } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { listTaskCategories } from "./api/api-task-categories";
import { createTask } from "./api/api-task";
import { updateUser } from "./api/api-user";

export default function CreatetaskForm({user, updateCount, userSetter, counterSetter, display, setDisplay, isNeed}) { 
    const [loaded, setLoaded] = useState();
    const [error, setError] = useState(); 
    const [taskCategories, setTaskCategories] = useState();
    

    //Values for new item obj
    const [aName, setAName] = useState();
    const [aDescription, setADescription] = useState();
    const [aTaskCategory, setATaskCategory] = useState();
    
    const [index, setIndex] = useState();

    const handleTaskCategoryChange = event => {
        setATaskCategory({id: event.target.value})
        console.log(aTaskCategory)
    }

    const handleNameChange = event => {
        setAName(event.target.value)
        console.log(aName)
    }

    const handleDescriptionChange = event => {
        setADescription(event.target.value)
        console.log(aDescription)
    }

    const updateIndex = (event) => {
        setIndex(event.target.id)
    }

    const clickSubmit = async () => {
        const task = {
            name: aName,
            description: aDescription,
            taskCategory: aTaskCategory
        }
        let savedTask = await createTask(task);
        savedTask = savedTask.data
        isNeed ? user.needsTasks.push(savedTask) : user.can.push(savedTask) 
        updateUser(user)
        userSetter(user) 
        counterSetter(updateCount + 1) //somehow this is required even tho the useEffect call in Profile doesn't depend on it? 
        setDisplay(display => !display)
    }

    useEffect(async () => {
        try {
            setTaskCategories(await listTaskCategories())
            setLoaded(true)
        } catch(err) {
            setError(err)
        }
    }, [])

    if (!loaded) {
        return <div>Loading . . . </div>
    } else if (error) {
        return <div>{error.message}</div>
    } else {
        return(
            <div>
                        <Card>
                            <CardContent>
                                <Typography variant="subtitle1">New Task</Typography>
                                <FormControl>
                                    <TextField
                                        id="name"
                                        label="Name"
                                        value={aName}
                                        onChange={handleNameChange}
                                    >   
                                    </TextField>
                                    <TextField
                                        id="description"
                                        label="Description"
                                        value={aDescription}
                                        multiline
                                        rows={4}
                                        onChange={handleDescriptionChange}
                                    >  
                                    </TextField>
                                </FormControl>
                                <br />
                                <br />
                                <FormControl>
                                <InputLabel shrink id="category">Category</InputLabel>
                                    <Select
                                        id="task-category"
                                        onChange={handleTaskCategoryChange}
                                    >
                                        {taskCategories.map((category, i) => {
                                            return (
                                                <MenuItem 
                                                    key={category.id} 
                                                    value={category.id} 
                                                    name="Category"
                                                    id={i}
                                                    onClick={updateIndex}
                                                >
                                                    {category.name}
                                                </MenuItem>
                                            )
                                        })}
                                    </Select>
                                    <FormHelperText>{index ? taskCategories[index].description : <>Select a Category</>}</FormHelperText>
                                </FormControl>
                                <br />
                                <FormControl>
                                    <Button onClick={clickSubmit}>Submit</Button>
                                </FormControl>
                            </CardContent>
                        </Card>
            </div>
        )
    }
}