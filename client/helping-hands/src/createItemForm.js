import React, { useState, useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import Card from "@material-ui/core/Card";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { TextField } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { Button } from "@material-ui/core";

export default function CreateItemForm() {
    // const [values, setValues] = useState({
    //     name: '',
    //     description: '',
    //     itemCategory: {},
    // });

    const [itemName, setItemName] = useState();
    const [itemCategory, setItemCategory] =useState();
    const [itemCategories, setItemCategories] = useState([]);   
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState();
    
    const createItem = async (item) => {
        let response = await fetch("http://localhost:8080/items", {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
    }
    //need to pass in itemcategory as an arg here?
    const clickSubmit = (itemName, itemCategory) => {
        const item = {
            name: itemName,
            itemCategory: itemCategory,
            description: "", //the db is getting this, so i need to figure out why it's not getting the itemName
            usersWhoHave: [],
            usersWhoNeed: []
        }
        try{
            createItem(item);
        } catch(err) {
            setError(err);
        }
    }

    const fetchItemCategories = async () => {
        const response = await fetch("http://localhost:8080/item-categories")
        const json = await response.json();
        setItemCategories(json);
        console.log(itemCategories)
        setLoaded(true);
    }

    useEffect(() => {
        try{
            fetchItemCategories();
        } catch(err) {
            setError(err)
        }
    }, [])

    
    if (!loaded) {
        return <div>Loading . . .</div>
    } else if (error) {
        return <div>{error.message}</div>
    } else {
        return (
            <Paper>
                <div className="row">
                    <div className="col-10">
                        <CardActionArea>
                            <Card variant="outlined">
                                <CardContent>
                                    <form>
                                        <TextField type="required" id = "name" label="Name" value={itemName} />
                                        <InputLabel id="itemCategoryLabel" >Item Category</InputLabel>
                                        <Select
                                            labelId="itemCategoryLabel"
                                            id="itemCategory"
                                            value={itemCategory}
                                            
                                            >
                                            {itemCategories.map((itemCategory, i) => {
                                                return (
                                                    <MenuItem value = {itemCategory}>{itemCategory.name}</MenuItem>
                                                )
                                            })}
                                            
                                        </Select>
                                        <Button onClick={clickSubmit(itemName, itemCategory)}>Submit</Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </CardActionArea>
                    </div>
                </div>
            </Paper>
        )
    }
}