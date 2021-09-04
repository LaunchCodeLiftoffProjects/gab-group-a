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
import { deleteTask } from "./api/api-task";
import { List, ListItem } from "@material-ui/core";

export default function Profile({match}) {

    const [user, setUser] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [displayTaskForm, setDisplayTaskForm] = useState(false);
    const [displayItemForm, setDisplayItemForm] = useState(false);
    const [displayHas, setDisplayHas] = useState(false);
    const [displayCan, setDisplayCan] = useState(false);
    const [userUpdateCounter, setUserUpdateCounter] = useState(0);

    const showTaskFormButton = () => {setDisplayTaskForm(displayTaskForm => !displayTaskForm)}
    const showItemFormButton = () => {setDisplayItemForm(displayItemForm => !displayItemForm)};

    const showCanButton = () => {setDisplayCan(displayCan => !displayCan)}
    const showHasButton = () => {setDisplayHas(displayHas => !displayHas)}

    //I think this is failing to delete the item/task from the db because its entry in the db is relied on by other entries. So it's refusing the delete request. 
    //TODO: knock the item off of the item category first before sending the delete request? 
    const removeItem = async (id, isNeed) => { 
        let i;
        console.log(id);
        isNeed ? i = user.needsItems.findIndex((element) => element.id === id) : i = user.has.findIndex((element) => element.id === id) 
        isNeed ? user.needsItems.splice(i, 1) : user.has.splice(i, 1)
        
        setUser(user);
        setUserUpdateCounter(userUpdateCounter + 1);
        // console.log(id);
        await deleteItem(id);
        await updateUser(user);
        
    }

    const removeTask = async (id, isNeed) => { 
        let i;
         
        isNeed ? i = user.needsTasks.findIndex((element) => element.id === id) : i = user.can.findIndex((element) => element.id === id) 
        isNeed ? user.needsTasks.splice(i, 1) : user.can.splice(i, 1)
        
        setUser(user);
        setUserUpdateCounter(userUpdateCounter + 1);
        
        await deleteTask(id);
        await updateUser(user);
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
                                                {user.can.map((task, i) => {
                                                    return(
                                                    <li key={i} >{task.name} ({task.hoursWork} hrs) <Button onClick={() => removeTask(task.id, false )}><RemoveIcon  /></Button></li>
                                                    )
                                                })}
                                            </ul>
                                        </Typography>
                                    <div>
                                        <Button onClick={showCanButton}> {displayCan ? <RemoveIcon /> : <AddIcon /> } Create New Task</Button>
                                        {displayCan ? <CreateTaskForm
                                            user={user} 
                                            updateCount = {userUpdateCounter} 
                                            userSetter = {setUser} 
                                            counterSetter={setUserUpdateCounter} 
                                            display={displayCan}
                                            setDisplay={setDisplayCan}
                                            isNeed= {false} /> : <div></div>}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="profile-card">
                            <Card>
                                <CardContent>
                                    <span className="row">
                                        <Typography className="col-10" variant="h6">Has to share</Typography>
                                        <Button className = "col-1" align="right"><EditIcon /></Button>
                                    </span>
                                    <Typography variant = "subtitle2" >
                                        <List>
                                            {user.has.map((item, i) => {
                                                return(
                                                <ListItem key={i}  >{item.name} <Button onClick={() => removeItem(item.id, false )}><RemoveIcon  /></Button></ListItem>
                                                )
                                            })}
                                        </List>
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <div>
                                        <Button onClick={showHasButton}> {displayHas ? <RemoveIcon /> : <AddIcon /> } Create New Item</Button>
                                        {displayHas ? <CreateItemForm 
                                                user={user} 
                                                updateCount = {userUpdateCounter} 
                                                userSetter = {setUser} 
                                                counterSetter={setUserUpdateCounter} 
                                                display={displayHas}
                                                setDisplay={setDisplayHas}
                                                isNeed={false} //this ain't working. . .
                                            /> : <div></div>}
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
                                        <List>
                                            {user.needsItems.map((item, i) => {
                                                return(
                                                <ListItem key={i}  >{item.name} <Button onClick={() => removeItem(item.id, true )}><RemoveIcon  /></Button></ListItem>
                                                )
                                            })}
                                        </List>
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
                                                isNeed={true}    
                                            /> : <div></div>}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="profile-card">
                            <Card>
                                <CardContent>
                                    <span className="row">
                                        <Typography className="col-10" variant="h6">Needs Some Help With (Tasks)</Typography>
                                        <Button className = "col-1" align="right"><EditIcon /></Button>
                                    </span>
                                    <Typography variant = "subtitle2" >
                                        <List>
                                            {user.needsTasks.map((task, i) => {
                                                return(
                                                <ListItem key={i}  >{task.name} <Button onClick={() => removeTask(task.id, true )}><RemoveIcon  /></Button></ListItem>
                                                )
                                            })}
                                        </List>
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <div>
                                        <Button onClick={showTaskFormButton}> {displayTaskForm ? <RemoveIcon /> : <AddIcon /> }Add</Button>
                                        {displayTaskForm ? <CreateTaskForm 
                                                user={user} 
                                                updateCount = {userUpdateCounter} 
                                                userSetter = {setUser} 
                                                counterSetter={setUserUpdateCounter} 
                                                display={displayItemForm}
                                                setDisplay={setDisplayItemForm}
                                                isNeed={true}    
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