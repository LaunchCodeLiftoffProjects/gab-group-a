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

export default function CreateItemForm() {

    const [values, setValues] = useState({
        name: "",
        description: "",
        itemCategory: {},
        usersWhoHave: [],
        usersWhoNeed: [],
        amtHave: 0,
        amtNeed: 0
    })    

    const itemLiteral = {
        id: 12,
        name: "Nothing",
        description: "just a test:",
        itemCategory: {id: 5},
        usersWhoHave: [],
        usersWoNeed: [],
        amtHave: 3,
        amtNeed: 7
    }

    const createItem = async (item) => {
        const response = await axios.post("http://localhost:8080/items", itemLiteral)
    }

    useEffect(() => {
        createItem();
    })

    return(
        <div>
            <Paper>
                <CardActionArea>
                    <Card>
                        <CardContent>
                            <FormControl>
                                <TextField>

                                </TextField>
                            </FormControl>
                        </CardContent>
                    </Card>
                </CardActionArea>
            </Paper>
        </div>
    )
  
}