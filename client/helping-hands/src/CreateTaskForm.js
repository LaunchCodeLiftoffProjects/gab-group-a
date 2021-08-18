import React, { useState, useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import Card from "@material-ui/core/Card";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { TextField } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import axios from 'axios'
import { FormHelperText } from "@material-ui/core";

export default function CreateTaskForm() {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(); 
    const [taskCategories, setTaskCategories] = useState();

    //Values to build Task obj
    const [aName, setAName] = useState();
    const [aDescription, setADescription] = useState();
    const [aTaskCategory, setATaskCategory] =useState();

    const createTask = async task => {
        return await axios.post("http://localhost:8080/tasks", task);
    }

    const fetchTaskCategories = async () => {
        let response = await fetch("http://localhost:8080/task-categories")
        setTaskCategories(await response.json())
        setLoaded(true)
    }

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

    const clickSubmit = () => {
        const task = {
            name: aName,
            description: aDescription,
            taskCategory: aTaskCategory
        };
        console.log(task);
        createTask(task);
    }

    useEffect(() => {
        try{
            fetchTaskCategories();
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
                <Paper>
                        <Card>
                            <CardContent>
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
                                        label="description"
                                        value={aDescription}
                                        onChange={handleDescriptionChange}
                                    >  
                                    </TextField>
                                </FormControl>
                                <br />
                                <br />
                                <FormControl>
                                    <Select
                                        id="item-category"
                                        onChange={handleTaskCategoryChange}
                                    >
                                        {taskCategories.map((category) => {
                                            return (
                                                <MenuItem key={category.id} value={category.id} name="Category">{category.name}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                    <FormHelperText>Item Category</FormHelperText>
                                    <FormHelperText>Description text</FormHelperText>
                                </FormControl>
                                <br />
                                <FormControl>
                                    <Button onClick={clickSubmit}>Submit</Button>
                                </FormControl>
                            </CardContent>
                        </Card>
                </Paper>
            </div>
        )
    }
}

