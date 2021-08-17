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
import { FormControl } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import axios from 'axios';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));


export default function CreateItemForm() {

    const classes = useStyles();
    const [values, setValues] = useState({
        name: "",
        description: "",
        itemCategory: {id: 0},
        usersWhoHave: [],
        usersWhoNeed: [],
        amtHave: 0,
        amtNeed: 0
    });   
    const [loaded, setLoaded] = useState();
    const [error, setError] = useState(); 
    const [itemCategories, setItemCategories] = useState();

    const itemLiteral = {
        name: "Second test",
        description: "just a second test:",
        itemCategory: {id: 0}, //this was the trick. need to pass this as just id.
        usersWhoHave: [],
        usersWhoNeed: [],
        amtHave: 3,
        amtNeed: 7
    }

    const createItem = async (item) => {
        const response = await axios.post("http://localhost:8080/items", itemLiteral)
    }

    const fetchItemCategories = async () => {
        let response = await fetch("http://localhost:8080/item-categories");
        setItemCategories(await response.json());
        console.log(itemCategories)
        setLoaded(true)
    }

    //When you call this method, you pass it the name of the value you want to change, and then it passes the event and the name to the setValues method
    //and then the ...values destructures the array and [name]: event.target.value sets the key name to whatever the value of the target of the event (onChange) is. 
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
        console.log(values)
        console.log(itemCategories)
    }

    useEffect(() => {
        fetchItemCategories();
        console.log(itemCategories)
        console.log(values)
    }, [])

    if (!loaded) {
        return <div>Loading . . . </div>
    } else if (error) {
        return <div>{error.message}</div>
    } else {
        return(
            <div>
                <Paper>
                    <CardActionArea>
                        <Card>
                            <CardContent>
                                <FormControl className={classes.formControl}>
                                    <TextField
                                        id="name"
                                        label="Name"
                                        value={values.name}
                                        onChange={handleChange('name')}
                                    >
                                        
                                    </TextField>
                                </FormControl>
                                <br />
                                <FormControl>
                                    <InputLabel id="item-category-dropdown">Item Category</InputLabel>
                                    <Select
                                        labelId="item-category-dropdown"
                                        id="item-category"
                                        value={values.itemCategory.id}
                                        onChange={handleChange('itemCategory')}
                                    >
                                        {itemCategories.map((category) => {
                                            return (
                                                <MenuItem value={category.id}>{category.name}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </CardContent>
                        </Card>
                    </CardActionArea>
                </Paper>
            </div>
        )
    
    }
}