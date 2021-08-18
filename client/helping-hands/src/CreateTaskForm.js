import React, { useState, useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';
import { TextField } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { Typography } from "@material-ui/core";
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
    const [index, setIndex] = useState();

    const createTask = async task => {
        return await axios.post("http://localhost:8080/tasks", task);
    }

    const fetchTaskCategories = async () => {
        try{
            let response = await fetch("http://localhost:8080/task-categories");
            setTaskCategories(await response.json());
            setLoaded(true);
        } catch(err) {
            setError(err);
        }
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

    const updateIndex = (event) => {
        setIndex(event.target.id)
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
                                <Typography variant="subtitle1">New task</Typography>
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
                                    <Select
                                        id="item-category"
                                        onChange={handleTaskCategoryChange}
                                    >
                                        {taskCategories.map((category, i) => {
                                            return (
                                                <MenuItem 
                                                key={category.id} 
                                                value={category.id} 
                                                name="Category"
                                                onClick={updateIndex}
                                                id={i}
                                                >
                                                    {category.name}
                                                </MenuItem>
                                            )
                                        })}
                                    </Select>
                                    <FormHelperText>{index ? taskCategories[index].description : <>Task Category</>}</FormHelperText>
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

