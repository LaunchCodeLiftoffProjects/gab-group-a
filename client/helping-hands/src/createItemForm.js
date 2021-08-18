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

export default function CreateItemForm() {

    const [loaded, setLoaded] = useState();
    const [error, setError] = useState(); 
    const [itemCategories, setItemCategories] = useState();

    //try setting all values of item obj as individual state vars
    const [aName, setAName] = useState();
    const [aDescription, setADescription] = useState();
    const [aItemCategory, setAItemCategory] =useState();

    const createItem = async (item) => {
        const response = await axios.post("http://localhost:8080/items", item)
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

    const clickSubmit = () => {
        const item = {
            name: aName,
            description: aDescription,
            itemCategory: aItemCategory
        }
        console.log(item)
        createItem(item);

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
                                        onChange={handleItemCategoryChange}
                                    >
                                        {itemCategories.map((category) => {
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