import React, { useState, useEffect } from "react";
import { Paper, Card, CardContent, Typography, ListItem, List } from "@material-ui/core";
import { Link } from "react-router-dom";
import { findItemByCategory, findItemByName } from "../search/search-item";
import "./ViewItemMatches.css"
import { oneUser } from "../api/api-user";

/*
PSEUDOCODE:

Display Item results

Card
Exact Matches:



*/

export default function ViewItemMatches() {
    const [results, setResults] = useState({
        exactMatches: [],
        categoryMatches: [],
        // usersLocation: [],
        // allUsers:[] //instead of this just find all of the users in the usersWhoHave of each item, and match location ids. 
    });
    const [loaded, setLoaded] =useState(false);
    const [error, setError] = useState();
    const [user, setUser] = useState();

    const findExactMatches = async user => {
        let result = [];
        
        for (const item of user.needsItems) {
            let responseItem = await findItemByName(item.name)
            result.push(...responseItem); //should I do this as a 2d array? the spread operator keeps it as 1d.
        }
        setResults(prevResults => ({
            ...prevResults,
            exactMatches: result
        }))
        setLoaded(val => ({
            ...val,
            exactLoaded: true
        }))
        console.log(result);

    }

    const findCategoryMatches = async user => {
        let result = []
        for (const item in user.needsItems) {
            // let responseTask = await findItemByCategory(item.itemCategory.name)
            result.push(...item.itemCategory.items)
            
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
        // const result = await fetch("http://localhost:8080/current-user")
        // setUser(await result.json());

        //placeholder user
        const result = await fetch("http://localhost:8080/users/1");
        setUser(result);
    }

    useEffect(async () => {
        
        // setUser(aUser); //this ain't working need to find fix. Using placeholder for now.
        findExactMatches(await oneUser(1));
        findCategoryMatches(await oneUser(1));
        setUser(await oneUser(1));
        setLoaded(true);
    }, [])

    if (!loaded.categoryResults || !loaded.exactResults) {
        return <div>Loading . . . </div>
    } else if (error) {
        return <div>{error.message}</div>
    } else {
        return (
            <Paper className="match-paper">
            <Typography variant="h3" >Item Matches for {user.name}</Typography>
                <Typography variant="h4">Users matching your needed Items:</Typography>
                <List>
                    {results. exactMatches.length ? results.exactMatches.map((result, i) => {
                        return (
                            <ListItem>
                                <Typography variant="subtitle2">Item Name: {result.name} - User(s): {result.usersWhoHave + " "}</Typography>
                            </ListItem>
                        )
                    }) : <>No matches!</>}
                </List>
            </Paper>
        )
    }

}