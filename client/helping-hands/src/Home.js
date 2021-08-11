import React, { useState, useEffect } from "react";
import "./Home.css"
import Paper from '@material-ui/core/Paper';
import Card from "@material-ui/core/Card";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CachedIcon from '@material-ui/icons/Cached';

export default function Home() {
    const [error, setError] = useState();
    const [usersArray, setUsersArray] = useState({});
    const [usersArrayIsLoaded, setUsersArrayIsLoaded] = useState(false);

    const fetchUsersArray = async () => {
        const result = await fetch("http://localhost:8080/users/");
        setUsersArray(await result.json());
        console.log(usersArray)
        setUsersArrayIsLoaded(true)
    }

    useEffect(()=> {  
        try{
         fetchUsersArray();
        } catch(err) {
            setError(err);
        }   
    }, [])


if(!usersArrayIsLoaded) {
    return <div><CachedIcon /></div>
} else if (error) {
    return <div>Error: {error.message}</div>
} 
else {
    return(
        <Paper className="paper">
            <div className="row home">
            <span className="col-1"></span>
            <div className="col-10" align="center">
                <Typography variant="h2">All Users</Typography> 
                    {usersArray.map((user)=> {
                        return(
                        <div key = {user.id} className="home-card">
                            <CardActionArea >
                                <Card variant="outlined" className="card" >
                                    <CardContent>
                                        <Typography variant="h3" align="left">{user.name}</Typography>
                                        <Typography variant="subtitle1" align="left">
                                            <ul>
                                                <li>Location: {user.location}</li>
                                                <li>List</li>
                                            </ul>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </CardActionArea>
                        </div>
                    )
                    })}
            
                </div>
                <span className="col-1"></span>
            </div>
        </Paper>
        )
    }
}