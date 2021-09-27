import React, { useState, useEffect } from "react";

import Paper from '@material-ui/core/Paper';
import Card from "@material-ui/core/Card";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CachedIcon from '@material-ui/icons/Cached';
import { Link } from "react-router-dom";
// import { listUsers } from "./api/api-user";
import { Avatar, List, ListItem, ListItemAvatar } from "@material-ui/core";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EmailIcon from '@material-ui/icons/Email';
import ListIcon from '@material-ui/icons/List';

export default function Home({match}) {
    const [error, setError] = useState();
    const [usersArray, setUsersArray] = useState([]);
    const [usersArrayIsLoaded, setUsersArrayIsLoaded] = useState(false);
    const [location, setLocation] = useState();
    const [locationLoaded, setLocationLoaded] = useState();

    const fetchLocation = async (id) => {
        const response = await fetch("http://localhost:8080/location/" + id);
        return await response.json();
        
    }

    useEffect(async ()=> {  
        try{
            // setUsersArray(await fetchLocationUsers(match.params.id).users)
            setLocation(await fetchLocation(match.params.id));
            console.log(location)
            setUsersArrayIsLoaded(true) //need this to handle errors though
        } catch(err) {
            setError(err)
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
            <span className="col-3"></span>
            <div className="col-6" align="center">
                <Typography variant="h4">Users in {location.name}</Typography> 
                {location.users.map((user) => {
                    return(
                    <div key = {user.id} className="home-card">
                        <CardActionArea >
                            <Card variant="outlined" className="card" >
                                <CardContent>
                                    <span className="row">
                                    <Avatar className="col-2">{user.name[0]}</Avatar>
                                    <Link className="col-10" to={"/profile/" + user.id}><Typography variant="h4" align="left">{user.name}</Typography></Link>
                                    </span>
                                    <Typography variant="subtitle1" align="left">
                                        <List>
                                            {/* <ListItem><LocationOnIcon />{user.location.name}</ListItem> */}
                                            <ListItem><ListItemAvatar><EmailIcon /></ListItemAvatar>{user.email? user.email : <>No email on file!</>}</ListItem>
                                            <ListItem><ListItemAvatar><ListIcon /></ListItemAvatar>Needs: {user.needsItems.length ? user.needsItems.map((item, i) => {
                                                return item.name + " "
                                            }) : <>No needed items!</> }</ListItem>
                                        </List>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </CardActionArea>
                    </div>
                    )})}
                </div>
                <span className="col-3"></span>
            </div>
        </Paper>
        )
    }
}