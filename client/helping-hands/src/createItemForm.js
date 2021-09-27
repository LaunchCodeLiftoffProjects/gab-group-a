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
import { listItemCategories } from "./api/api-item-categories";
import { createItem } from "./api/api-item";
import { updateUser } from "./api/api-user";
import { Snackbar } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

//TODO add a "item created" snackbar on successful item creation
export default function CreateItemForm({user, updateCount, userSetter, counterSetter, display, setDisplay, isNeed}) { 
    const [loaded, setLoaded] = useState();
    const [error, setError] = useState(); 
    const [itemCategories, setItemCategories] = useState();
    

    //Values for new item obj
    const [aName, setAName] = useState();
    const [aDescription, setADescription] = useState();
    const [aItemCategory, setAItemCategory] = useState();
    const [open, setOpen] = useState(false);

    const openSnackbar = () => {
        setOpen(true);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    
    const [index, setIndex] = useState();

    const handleItemCategoryChange = event => {
        setAItemCategory({id: event.target.value})
    }

    const handleNameChange = event => {
        setAName(event.target.value)
    }

    const handleDescriptionChange = event => {
        setADescription(event.target.value)
    }

    const updateIndex = (event) => {
        setIndex(event.target.id)
    }

    const clickSubmit = async () => {
        const item = {
            name: aName,
            description: aDescription,
            itemCategory: aItemCategory
        }
        let savedItem = await createItem(item);
        savedItem = savedItem.data
        isNeed ? user.needsItems.push(savedItem) : user.has.push(savedItem);
        await updateUser(user)
        userSetter(user) 
        counterSetter(updateCount + 1) //somehow this is required even tho the useEffect call in Profile doesn't depend on it? 
        // setDisplay(display => !display) //can't close the form automatically AND display snackbar because of my dumb design. 
        openSnackbar();
    }

    useEffect(async () => {
        try {
            setItemCategories(await listItemCategories())
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
                                <Typography variant="subtitle1">New Item</Typography>
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
                                <InputLabel id="category">Category</InputLabel>
                                    <Select
                                        id="item-category"
                                        onChange={handleItemCategoryChange}
                                    >
                                        {itemCategories.map((category, i) => {
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
                                    <FormHelperText>{index ? itemCategories[index].description : <>Select a Category</>}</FormHelperText>
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