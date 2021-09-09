import React, { useState, useEffect } from "react";
import { findUserByName, findUserByEmail, findUserByLocationName } from "./search-user";
import { findItemByCategory, findItemByName } from "./search-item";
import { findTaskByCategory, findTaskByName } from "./search-task";
import Paper from '@material-ui/core/Paper';
import { List, ListItem } from "@material-ui/core";
import "./DisplaySearchResults.css"
import { ListItemText } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useLocation from 'react-router-dom';
import { Link } from "react-router-dom";


export default function DisplaySearchResults({match}) {

    const [results, setResults] = useState({
        users: [],
        items: [],
        tasks:[]
    });
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState();
    //for refactoring to use query params instead of path params. 
    // function useQuery() {
    //     return new URLSearchParams(useLocation().search);
    //   }

    // const query = useQuery(); 

    useEffect(async () => {
        const users = await findUserByName(match.params.query);
        // const locs = await findUserByLocationName(match.params.query) //This appends an empty array if there's no results?
        // users.push(locs)

        const items = await findItemByName(match.params.query)
        const tasks = await findTaskByName(match.params.query)
        setResults(prevState => ({
            ...prevState,
            users: users,
            items: items,
            tasks: tasks
        }));
        
        console.log(results)
        setLoaded(true)
    }, [match.params.query])
    if(!loaded) {
        return <div>Loading . . .</div>
    } else {
        return (
            <div className="search-paper">
                <Paper>
                <Typography variant="h2">Results</Typography>
                    <Card className="result-card">
                        <Typography variant="h4">Users</Typography>
                        <List>
                        {results.users.map((result, i ) => {
                        return <ListItem key={result.id}>
                                <ListItemText primary={result.name} secondary={"Location: " + result.location.name} />
                            </ListItem>
                        })}
                        </List>
                    </Card>
                    <Card className="result-card">
                        <Typography variant="h4">Items</Typography>
                        <List>
                        {results.items.map((result, i ) => {
                        return <ListItem key={result.id}>
                                <ListItemText primary={result.name} secondary={result.usersWhoHave.length ? "Users Who Have This: " + result.usersWhoHave.map(user =>user.name + ", ") : "No users have this!"} />
                            </ListItem>
                        })}
                        </List>
                    </Card>
                    <Card className="result-card">
                        <Typography variant="h4">Tasks</Typography>
                        <List>
                        {results.tasks.map((result, i ) => {
                        return <ListItem key={result.id}>
                                <ListItemText primary={result.name} secondary={result.usersWhoCan.length ? "Users Who Can Help With This: " + result.usersWhoCan.map(user =>user.name + ", ") : "No users can help with this!"} />
                            </ListItem>
                        })}
                        </List>
                    </Card>
                </Paper>
            </div>
        )

    }
}