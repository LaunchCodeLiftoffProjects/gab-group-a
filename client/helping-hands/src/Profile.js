import React, { useState, useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import Card from "@material-ui/core/Card";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Avatar from '@material-ui/core/Avatar';
import "./Profile.css";
import CreateItemForm from "./CreateItemForm";
import CreateTaskForm from "./CreateTaskForm";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

export default function Profile({id}) {

    const [user, setUser] = useState();
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [displayTaskForm, setDisplayTaskForm] = useState(false);
    const [displayItemForm, setDisplayItemForm] = useState(false);

    id = 1 //replace this by passing it in as a path var?
    const fetchUser = async (id) => {
        let response = await fetch("http://localhost:8080/users/" + id)
        let json = await response.json(); //not sure if this step is necessary, but it works. 
        setUser(json);
        setLoaded(true)
    }

    const showTaskFormButton = () => {setDisplayTaskForm(displayTaskForm => !displayTaskForm)}
    const showItemFormButton = () => {setDisplayItemForm(displayItemForm => !displayItemForm)};

    useEffect(() => {
        try{
            fetchUser(2)
            console.log(user)
        } catch(err) {
            console.log(err)
            setError(err);
        }
    }, [])
    if(!loaded) {
        return <div>Loading . . .</div>
    } else if (error) {
        return <div>Error: {error.message}</div>
    } else return (
        <Paper >
            <div className="container profile-container">
                <div className="row">
                    <div className="col-4" align="left">
                        <CardActionArea>
                            <Card>
                                <CardContent>
                                <div className="container">
                                    <span className="row"><Avatar className="col-1">{user.name[0]}</Avatar><Typography className="col-8" variant="h6">{user.name}</Typography></span>
                                    <span className="row"><br /><Typography variant="subtitle1">{user.location.name}</Typography></span>
                                    <span className="row"><Typography variant="subtitle1">{user.email}</Typography></span>
                                </div>
                                </CardContent>
                            </Card>
                        </CardActionArea>
                    </div>
                    <div className="col-8" align="left">
                        <div className="profile-card">
                            <CardActionArea>
                                <Card >
                                    <CardContent>
                                        <span className="row">
                                            <Typography className="col-10" variant="h6">Has</Typography>
                                            <Button className = "col-1" align="right"><EditIcon /></Button>
                                        </span>
                                        <Typography variant = "subtitle2" >
                                            <ul >
                                                {user.has.map((item, i) => {
                                                    return(
                                                    <li key={i}>{item.name}</li>
                                                    )
                                                })}
                                            </ul>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </CardActionArea>
                        </div>
                        <div className="profile-card">
                            <CardActionArea>
                                <Card>
                                    <CardContent>
                                        <span className="row">
                                            <Typography className="col-10" variant="h6">Can</Typography>
                                            <Button className = "col-1" align="right"><EditIcon /></Button>
                                        </span>
                                        <Typography variant = "subtitle2" >
                                            <ul >
                                                {user.can.map((item, i) => {
                                                    return(
                                                    <li key={i}>{item.name} ({item.hoursWork} hrs)</li>
                                                    )
                                                })}
                                            </ul>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </CardActionArea>
                        </div>
                        <div className="profile-card">
                            <CardActionArea>
                                <Card>
                                    <CardContent>
                                        <span className="row">
                                            <Typography className="col-10" variant="h6">Needs (Items)</Typography>
                                            <Button className = "col-1" align="right"><EditIcon /></Button>
                                        </span>
                                        <Typography variant = "subtitle2" >
                                        <ul>
                                            {user.needsItems.map((item, i) => {
                                                return(
                                                <li key={i}>{item}</li>
                                                )
                                            })}
                                        </ul>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </CardActionArea>
                        </div>
                        <div className="profile-card">
                            <Button onClick={showItemFormButton}> {displayItemForm ? <RemoveIcon /> : <AddIcon /> } Create New Item</Button>
                            {displayItemForm ? <CreateItemForm /> : <div></div>}
                        </div>
                        <div className="profile-card">
                            <Button onClick={showTaskFormButton}> {displayTaskForm ? <RemoveIcon /> : <AddIcon /> } Create New Task</Button>
                            {displayTaskForm ? <CreateTaskForm /> : <div></div>}
                        </div>
                    </div>
                </div>
            </div>
        </Paper>
    )
}