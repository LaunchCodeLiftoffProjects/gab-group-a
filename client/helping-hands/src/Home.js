import React, { useState, useEffect } from "react";
import "./Home.css"
import Paper from '@material-ui/core/Paper';
import Card from "@material-ui/core/Card";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default function Home() {
    const [user, setUser] = useState();
    const [userIsLoaded, setuserIsLoaded] = useState(false);
    const [error, setError] = useState();
    const [usersArray, setUsersArray] = useState({});
    const [usersArrayIsLoaded, setUsersArrayIsLoaded] = useState(false);

    const fetchUsersArray = async () => {
        const result = await fetch("https://randomuser.me/api/?results=10");
        setUsersArray(await result.json());
        console.log(usersArray)
        setUsersArrayIsLoaded(true)
    }

    const fetchUser = async () => {
        const result = await fetch("https://api.github.com/users/cgremaud");
        setUser(await result.json());
        console.log(user);
        setuserIsLoaded(true);
    }

    useEffect(()=> {  
        try{
         fetchUser();
         fetchUsersArray();
        } catch(err) {
            setError(err);
        }   
    }, [])


if(!userIsLoaded || !usersArrayIsLoaded) {
    return <div>Loading . . .</div>
} else if (error) {
    return <div>Error: {error.message}</div>
} 
else {
    return(
        <Paper className="paper">
            <div className="row home">
            <span className="col-1"></span>
            <div className="col-10" align="center"> 
                    <p><CardActionArea>
                        <Card variant="outlined" className="card">
                            <CardContent>
                                <Typography variant="h3" align="left">{user.name}</Typography>
                                <Typography variant="subtitle1" align="left">
                                    <ul>
                                        <li>{user.bio}</li>
                                        <li>{user.created_at}</li>
                                    </ul>
                                </Typography>
                            </CardContent>
                        </Card>
                    </CardActionArea></p>
                    {usersArray.results.map((user)=> {
                        return(
                            <p id={user.login.uuid}><CardActionArea>
                                <Card variant="outlined" className="card" >
                                    <CardContent>
                                        <Typography variant="h3" align="left">{user.name.first} {user.name.last}</Typography>
                                        <Typography variant="subtitle1" align="left">
                                            <ul>
                                                <li>Id: {user.login.uuid}</li>
                                                <li>List</li>
                                            </ul>
                                        </Typography>
                                    </CardContent>
                                </Card>
                        </CardActionArea></p>
                    )
                    })}
            
                </div>
                <span className="col-1"></span>
            </div>
        </Paper>
        )
    }
}