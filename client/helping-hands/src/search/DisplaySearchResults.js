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
        const response = await findUserByName(match.params.query);
        response.push(await findUserByLocationName(match.params.query))
        setResults(prevState => ({
            ...prevState,
            users: response
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
                <Typography variant="h3">Results</Typography>
         
                    {results.map((result, i ) => {
                       return <Card className="result-card">
                            <CardContent>
                                <Typography variant="h6">
                                    {result.name} 
                                </Typography>
                            </CardContent>
                        </Card>
                    })}
                   
                </Paper>
            </div>
        )

    }
}