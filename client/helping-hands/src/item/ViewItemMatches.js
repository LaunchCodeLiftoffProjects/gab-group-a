import React, { useState, useEffect } from "react";
import { Paper, Card, CardContent, Typography, ListItem, List } from "@material-ui/core";
import { Link } from "react-router-dom";
import { findItemByCategory, findItemByName } from "../search/search-item";
import "./ViewItemMatches.css"

export default function ViewItemMatches() {
    const [results, setResults] = useState({
        exactMatches: [],
        categoryMatches: [],
        // usersLocation: [],
        // allUsers:[] //instead of this just find all of the users in the usersWhoHave of each item, and match location ids. 
    });
    const [loaded, setLoaded] = useState({
        exactResults: false,
        categoryResults: false
    });
    const [error, setError] = useState();
    const [user, setUser] = useState();

    const findExactMatches = async user => {
        let result = [];
        
        for (const item of user.needsItems) {
            result.push(...await findItemByName(item.name))
        }
        setResults(prevResults => ({
            ...prevResults,
            exactMatches: result
        }))
        setLoaded(val => ({
            ...val,
            exactLoaded: true
        }))

    }

    const findCategoryMatches = async user => {
        let result = []
        for (const item in user.needsItems) {
            result.push(...await findItemByCategory(item.itemCategory.name))
            
        }
        setResults(prevResults => ({
            ...prevResults,
            categoryMatches: result
        }))
        setLoaded(val => ({
            ...val,
            categoryResults: true
        }))
    }
    //Question: Will I have to manually send along the session ID here? or will it be automatically pkgd with the request? 
    const fetchCurrentUser = async () => {
        const result = await fetch("http://localhost:8080/current-user")
        setUser(await result.json());

    }

    useEffect(async () => {
        await fetchCurrentUser(); //this ain't working need to find fix. 
        await findExactMatches(user);
        await findCategoryMatches(user);
    }, [])

    if (!loaded.categoryResults || !loaded.exactResults) {
        return <div>Loading . . . </div>
    } else if (error) {
        return <div>{error.message}</div>
    } else {
        return (
            <Paper className="match-paper">
                <Typography variant="h4">Users matching your needed Items</Typography>
                <List>
                    {results.exactMatches.map((result, i) => {
                        return (
                            <ListItem>
                                <Typography variant="subtitle2">Item Name: {result.name} - User(s): {result.usersWhoHave + " "}</Typography>
                            </ListItem>
                        )
                    })}
                </List>
            </Paper>
        )
    }

}