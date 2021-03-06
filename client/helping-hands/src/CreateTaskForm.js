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
import { Snackbar } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

export default function CreateTaskForm({user, updateCount, userSetter, counterSetter, display, setDisplay, isNeed}) { 
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(); 
    const [taskCategories, setTaskCategories] = useState();
    

    //Values for new item obj. Verbose but easier to read.
    const [aName, setAName] = useState();
    const [aDescription, setADescription] = useState();
    const [aTaskCategory, setATaskCategory] = useState();
    const [aHoursWork, setAHoursWork] = useState();

    const [open, setOpen] = useState(false);

    const [index, setIndex] = useState();

    //this works but is verbose. Makes more sense to read than doing it all as one state obj tho. 
    const handleTaskCategoryChange = event => {
        setATaskCategory({id: event.target.value})
    }

    const handleNameChange = event => {
        setAName(event.target.value)
    }

    const handleDescriptionChange = event => {
        setADescription(event.target.value)
    }

    const handleHoursWorkChange = event => {
        setAHoursWork(event.target.value)
    }

    const updateIndex = (event) => {
        setIndex(event.target.id)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    const clickSubmit = async () => {
        const task = {
            name: aName,
            description: aDescription,
            taskCategory: aTaskCategory,
            hoursWork: aHoursWork
        }
        let savedTask = await createTask(task);
        savedTask = savedTask.data;
        isNeed ? user.needsTasks.push(savedTask) : user.can.push(savedTask);
        updateUser(user);
        userSetter(user); 
        counterSetter(updateCount + 1) //somehow this is required even tho the useEffect call in Profile doesn't depend on it? 
        // setDisplay(display => !display);
        setOpen(true);
    }

    useEffect(async () => {
        try {
            setTaskCategories(await listTaskCategories())
            setLoaded(true)
        } catch(err) {
            setError(err)
        }
    }, [])

    const action = (
        <React.Fragment>
          <Button color="secondary" size="small" onClick={handleClose}>
            UNDO
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );

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
                                    <TextField
                                        id="hoursWork"
                                        label="Hours of Work"
                                        value={aHoursWork}
                                        onChange={handleHoursWorkChange}
                                    >  
                                    </TextField>
                                </FormControl>
                                <br />
                                <br />
                                <FormControl>
                                <InputLabel id="category">Category</InputLabel>
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
                        <Snackbar
                            open={open}
                            autoHideDuration={6000}
                            onClose={handleClose}
                            message="Successfully Added"
                            action={action}
                        />
            </div>
        )
    }
}