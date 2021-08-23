import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';
import { TextField, Typography } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import axios from 'axios'
import { FormHelperText } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { listItemCategories } from "./api/api-item-categories";
import { createItem } from "./api/api-item";
import { updateUser } from "./api/api-user";

export default function CreateItemForm({user, displayForm}) {

    const [loaded, setLoaded] = useState();
    const [error, setError] = useState(); 
    const [itemCategories, setItemCategories] = useState();

    //Values for new item obj
    const [aName, setAName] = useState();
    const [aDescription, setADescription] = useState();
    const [aItemCategory, setAItemCategory] =useState();
    const [index, setIndex] = useState();

    const handleItemCategoryChange = event => {
        setAItemCategory({id: event.target.value})
        console.log(aItemCategory)
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
        const item = {
            name: aName,
            description: aDescription,
            itemCategory: aItemCategory
        }
        console.log(item)
        let savedItem = await createItem(item);
        savedItem = savedItem.data
        
        console.log(savedItem);
        
        user.needsItems.push(savedItem)
        // console.log(user)
        updateUser(user)
        
        console.log(user)
        displayForm = displayForm => !displayForm;

    }

    useEffect(async () => {
        try {
            setItemCategories(await listItemCategories())
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
                                <InputLabel shrink id="category">Category</InputLabel>
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
            </div>
        )
    }
}