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

    const clickSubmit = () => {
        const item = {
            name: values.name || undefined,
            itemCategory: values.itemCategory,
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
        setLoaded(true);
    }

    useEffect(() => {
        try{
            fetchItemCategories();
        } catch(err) {
            setError(err)
        }
    }, [])

    
}