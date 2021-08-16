import React, { useState, useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import Card from "@material-ui/core/Card";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default function createItemForm() {
    const [values, setValues] = useState({
        name: '',
        description: '',
        itemCategory: {},
        usersWhoHave: [], //should I include these at all here? or add them elsewhere? 
        usersWhoNeed: [],
    });

    const [itemCategories, setItemCategories] = useState([]);   

    const [loaded, setLoaded] = useState(false);
    
    const clickSubmit = () => {
        const item = {
            name: values.name || undefined,
            itemCategory: values.itemCategory,
        }
    }

    const fetchItemCategories = async () => {
        const response = await fetch("http://localhost:8080/item-categories")
        const json = await response.json();
        setItemCategories(json);
        setLoaded(true);
    }
}