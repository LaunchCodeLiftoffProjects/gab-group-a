import React, { useState, useEffect } from "react";
import { findUserByName } from "./search-user";
import { findItemByCategory, findItemByName } from "./search-item";
import { findTaskByCategory, findTaskByName } from "./search-task";
import Paper from '@material-ui/core/Paper';
import { List, ListItem } from "@material-ui/core";
import "./DisplaySearchResults.css"
import { ListItemText } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";


export default function DisplaySearchResults({match}) {

    const [results, setResults] = useState({
        users: [],
        items: [],
        tasks:[],
        itemCats: [],
        taskCats: []
    });
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState();

    useEffect(async () => {
        const users = await findUserByName(match.params.query);
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
            <div>
                <Paper className="search-paper">
                <Typography variant="h2">Results</Typography>
                    <Card className="result-card">
                        <Typography variant="h4">Users</Typography>
                        <List>
                        {results.users.length? results.users.map((result, i ) => {
                        return <Link to={"/profile/" +result.id }><ListItem key={result.id}>
                                <ListItemText primary={result.name} secondary={"Location: " + result.location.name} />
                            </ListItem></Link>
                        }) : <div>No results found!</div>}
                        </List>
                    </Card>
                    <Card className="result-card">
                        <Typography variant="h4">Items</Typography>
                        <List>
                        {results.items.length ? results.items.map((result, i ) => {
                        return <ListItem key={result.id}>
                                <ListItemText 
                                    primary={result.name} 
                                    secondary={(result.usersWhoHave.length ? 
                                        "Users Who Have This: " + result.usersWhoHave.map(user =>user.name + ", ") : "No users have this!") + " - " + (result.usersWhoNeed.length? 
                                    "Users Who Need This: " + result.usersWhoNeed.map(user => user.name + ", ") : "No users need this!")} />
                                
                            </ListItem>
                        }): <div>No results found!</div>}
                        </List>
                    </Card>
                    <Card className="result-card">
                        <Typography variant="h4">Tasks</Typography>
                        <List>
                        {results.tasks.length ? results.tasks.map((result, i ) => {
                        return <ListItem key={result.id}>
                        {/* {result.name} <br />
                        Users who can help: {result.usersWhoCan.length ? result.usersWhoCan.map( user =>{ 
                                return (<Link to={"/profile/" + user.id}>{user.name + ", "}</Link>)
                            }) : <>No users!</>} 
                                {/* <ListItemText primary={result.name} secondary={result.usersWhoCan.length ? "Users Who Can Help With This: " + result.usersWhoCan.map(user =>user.name + ", ") : "No users can help with this!"} /> */}
                                 
                                 <ListItemText 
                                    primary={result.name} 
                                    secondary={(result.usersWhoCan.length ? 
                                        "Users Who Have This: " + result.usersWhoHave.map(user =>user.name + ", ") : "No users have this!") + " - " + (result.usersWhoNeed.length? 
                                    "Users Who Need This: " + result.usersWhoNeed.map(user => (user.name + ", ")) : "No users need this!")} />
                            </ListItem>
                        }): <div>No results found!</div>}
                        </List>
                    </Card>
                </Paper>
            </div>
        )

    }
}