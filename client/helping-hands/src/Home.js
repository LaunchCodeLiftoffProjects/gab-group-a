import React, { useState, useEffect } from "react";
import "./Home.css";
import Paper from '@material-ui/core/Paper';
import Card from "@material-ui/core/Card";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CachedIcon from '@material-ui/icons/Cached';
import { Link } from "react-router-dom";
import { listUsers } from "./api/api-user";
import { Avatar, List, ListItem, ListItemAvatar } from "@material-ui/core";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EmailIcon from '@material-ui/icons/Email';
import ListIcon from '@material-ui/icons/List';

export default function Home() {
    const [error, setError] = useState();
    const [usersArray, setUsersArray] = useState([]);
    const [usersArrayIsLoaded, setUsersArrayIsLoaded] = useState(false);

    useEffect(async ()=> {  
        try{
            setUsersArray(await listUsers())
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
                <Typography variant="h2">All Users</Typography> 
                {usersArray.map((user) => {
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
                                            <Link to={"/location/" + user.location.id}><ListItem><LocationOnIcon />{user.location.name}</ListItem></Link>
                                            <ListItem><EmailIcon />{user.email? user.email : <>No email on file!</>}</ListItem>
                                            <ListItem><ListIcon />Needs: {user.needsItems.length ? user.needsItems.map((item, i) => {
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