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

export default function CreateItemForm({userId}) {

    const [loaded, setLoaded] = useState();
    const [error, setError] = useState(); 
    const [itemCategories, setItemCategories] = useState();

    //try setting all values of item obj as individual state vars
    const [aName, setAName] = useState();
    const [aDescription, setADescription] = useState();
    const [aItemCategory, setAItemCategory] =useState();
    const [index, setIndex] = useState();

    const createItem = async (item) => {
        const response = await axios.post("http://localhost:8080/items", item)
        return response
    }

    const addToNeedsItems = async (itemName, id) => {
        const response = await axios.post("http://localhost:8080/users/" + id + "/add-needs-item/", itemName)
        return response
    }

    const fetchItemCategories = async () => {
        try{    
            let response = await fetch("http://localhost:8080/item-categories");
            setItemCategories(await response.json());
            console.log(itemCategories)
            setLoaded(true)
        } catch(err) {
            setError(err)
        }
    }

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

    const clickSubmit = () => {
        const item = {
            name: aName,
            description: aDescription,
            itemCategory: aItemCategory
        }
        console.log(item)
        createItem(item).then(addToNeedsItems(item.name, userId))

    }

    useEffect(() => {
        fetchItemCategories();
        console.log(itemCategories)
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
                                                    labelId="category" 
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