import React, { useState, useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import Card from "@material-ui/core/Card";
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
import { oneUser } from "./api/api-user";
import { updateUser } from "./api/api-user";
import { deleteItem } from "./api/api-item";

export default function Profile({match}) {

    const [user, setUser] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [displayTaskForm, setDisplayTaskForm] = useState(false);
    const [displayItemForm, setDisplayItemForm] = useState(false);
    const [userUpdateCounter, setUserUpdateCounter] = useState(0);

    const showTaskFormButton = () => {setDisplayTaskForm(displayTaskForm => !displayTaskForm)}
    const showItemFormButton = () => {setDisplayItemForm(displayItemForm => !displayItemForm)};

    const removeItem = async (event) => { //somehow something I'm doing in this function is erasing all of the ids from the needsItems array. 
        const itemId = event.target.value;
        // deleteItem(itemId);
        const i = user.needsItems.findIndex((element) => element.id = itemId) 
        console.log(user)
        console.log(i)
        user.needsItems.splice(i, 1); //this is just taking off the last item of the array b/c it can't find the index so it's returning -1
        setUser(user);
        setUserUpdateCounter(userUpdateCounter + 1);
        updateUser(user);
    }

    useEffect(async () => { //TODO refactor this to put async function definition inside useEffect
        try{
            if (!user){
                const response = await oneUser(match.params.id)
                setUser(response)
                setLoaded(true)
                console.log(user)
                
            }
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
                        <Card>
                            <CardContent>
                            <div className="container">
                                <span className="row"><Avatar className="col-1">{user.name[0]}</Avatar><Typography className="col-8" variant="h6">{user.name}</Typography></span>
                                <span className="row"><br /><Typography variant="subtitle1">{user.location.name}</Typography></span>
                                <span className="row"><Typography variant="subtitle1">{user.email}</Typography></span>
                            </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="col-8" align="left">
                        <div className="profile-card">
                            <Card >
                                <CardContent>
                                    <span className="row">
                                        <Typography className="col-10" variant="h6">Has to Share</Typography>
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
                        </div>
                        <div className="profile-card">
                            <Card>
                                <CardContent>
                                    <span className="row">
                                        <Typography className="col-10" variant="h6">Can Help With</Typography>
                                        <Button className = "col-1" align="right"><EditIcon /></Button>
                                    </span>
                                    </CardContent>
                                    <CardContent>
                                        <Typography variant = "subtitle2" >
                                            <ul >
                                                {user.can.map((item, i) => {
                                                    return(
                                                    <li key={i} >{item.name} ({item.hoursWork} hrs)</li>
                                                    )
                                                })}
                                            </ul>
                                        </Typography>
                                    <div>
                                        <Button onClick={showTaskFormButton}> {displayTaskForm ? <RemoveIcon /> : <AddIcon /> } Create New Task</Button>
                                        {displayTaskForm ? <CreateTaskForm /> : <div></div>}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="profile-card">
                            <Card>
                                <CardContent>
                                    <span className="row">
                                        <Typography className="col-10" variant="h6">Needs Some Help With (Items)</Typography>
                                        <Button className = "col-1" align="right"><EditIcon /></Button>
                                    </span>
                                    <Typography variant = "subtitle2" >
                                        <ul>
                                            {user.needsItems.map((item, i) => {
                                                return(
                                                <li key={i} id = {i} value = {item.id}>{item.name} <RemoveIcon align="right" onClick={removeItem} /></li>
                                                )
                                            })}
                                        </ul>
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <div>
                                        <Button onClick={showItemFormButton}> {displayItemForm ? <RemoveIcon /> : <AddIcon /> } Create New Item</Button>
                                        {displayItemForm ? <CreateItemForm 
                                                user={user} 
                                                updateCount = {userUpdateCounter} 
                                                userSetter = {setUser} 
                                                counterSetter={setUserUpdateCounter} 
                                                display={displayItemForm}
                                                setDisplay={setDisplayItemForm}    
                                            /> : <div></div>}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </Paper>
    )
}