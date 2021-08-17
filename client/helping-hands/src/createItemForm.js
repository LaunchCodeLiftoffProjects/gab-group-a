import React, { useState, useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import Card from "@material-ui/core/Card";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { TextField } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import axios from 'axios'
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
    const [idObj, setIdObj] = useState({});
    const [values, setValues] = useState({
        name: "",
        description: "",
        itemCategory: {}, //need to get this into format of itemCategory: {id: x}, maybe just make all of these separate state vars? 
        usersWhoHave: [],
        usersWhoNeed: [],
        amtHave: 0,
        amtNeed: 0
    });   
    const [loaded, setLoaded] = useState();
    const [error, setError] = useState(); 
    const [itemCategories, setItemCategories] = useState();

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

    //When you call this method, you pass it the name of the value you want to change, and then it passes the event and the name to the setValues method
    //and then the ...values destructures the array and [name]: event.target.value sets the key name to whatever the value of the target of the event (onChange) is. 
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
        console.log(values)
        console.log(itemCategories)
    }

    //this is an extremely kludgey solution to the problem of trying to stick an {id: X} object on to the values object
    const handleClick = (event) => {
        setIdObj({id:event.target.value})
        console.log(idObj) //This will work. Just have to set values.itemCategory = idObj in the clickSubmit handler
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
                                <FormControl>
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
                                        // value={idObj}
                                        onChange={handleClick}
                                    >
                                        {itemCategories.map((category) => {
                                            return (
                                                <MenuItem key={category.id} value={category.id} name="Category">{category.name}</MenuItem>
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