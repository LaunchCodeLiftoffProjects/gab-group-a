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
import { List, ListItem, ListItemText } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Profile({match}) {

    const [user, setUser] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [displayTaskForm, setDisplayTaskForm] = useState(false);
    const [displayItemForm, setDisplayItemForm] = useState(false);
    const [displayHas, setDisplayHas] = useState(false);
    const [displayCan, setDisplayCan] = useState(false);
    const [userUpdateCounter, setUserUpdateCounter] = useState(0);
    const [editHas, setEditHas] = useState(false);
    const [editCan, setEditCan] = useState(false);
    const [editNeedsItems, setEditNeedsItems] = useState(false);
    const [editNeedsTasks, setEditNeedsTasks] = useState(false);

    const showTaskFormButton = () => {setDisplayTaskForm(displayTaskForm => !displayTaskForm)}
    const showItemFormButton = () => {setDisplayItemForm(displayItemForm => !displayItemForm)};
    const showEditHasButtons = () => {setEditHas(editHas => !editHas)}
    const showEditCanButtons = () => {setEditCan(editCan => !editCan)}
    const showEditNeedsItemsButtons = () => {setEditNeedsItems(editNeedsItems => !editNeedsItems)}
    const showEditNeedsTasksButtons = () => {setEditNeedsTasks(editNeedsTasks => !editNeedsTasks)}

    const showCanButton = () => {setDisplayCan(displayCan => !displayCan)}
    const showHasButton = () => {setDisplayHas(displayHas => !displayHas)}

    const removeItem = async (id, isNeed) => { 
        let i;
        console.log(id);
        isNeed ? i = user.needsItems.findIndex((element) => element.id === id) : i = user.has.findIndex((element) => element.id === id) 
        isNeed ? user.needsItems.splice(i, 1) : user.has.splice(i, 1)
        
        setUser(user);
        setUserUpdateCounter(userUpdateCounter + 1);
        
        await updateUser(user);
        await deleteItem(id);
        
    }

    const removeTask = async (id, isNeed) => { 
        let i;
        
        isNeed ? i = user.needsTasks.findIndex((element) => element.id === id) : i = user.can.findIndex((element) => element.id === id) 
        isNeed ? user.needsTasks.splice(i, 1) : user.can.splice(i, 1)
        
        setUser(user);
        setUserUpdateCounter(userUpdateCounter + 1);
        
        await updateUser(user);
        await deleteTask(id);
        
    }


    useEffect(async () => { 
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
                                <span className="row"><Link to={"/location/" + user.location.id}><br /><Typography variant="subtitle1">{user.location.name}</Typography></Link></span>
                                <span className="row"><Typography variant="subtitle1">{user.email}</Typography></span>
                            </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="col-8" align="left">
                        {/* <Typography variant="h4">Can Help With: </Typography> */}
                        <div className="profile-card">
                            <Card>
                                <CardContent>
                                    <span className="row">
                                        <Typography className="col-10" variant="h6">Items I can Give</Typography>
                                        <Button onClick={showEditHasButtons} className = "col-1" align="right"><EditIcon /></Button>
                                    </span>
                                    </CardContent>
                                    <CardContent>
                                        <Typography variant = "subtitle2" >
                                            <List>
                                                {user.has.length ? user.has.map((item, i) => {
                                                    return(
                                                    <ListItem key={i} ><ListItemText primary = {item.name} secondary={item.description}>  </ListItemText>{ editHas ? <Button onClick={() => removeItem(item.id, false )}><RemoveIcon  /></Button> : <></>}</ListItem>
                                                    )
                                                }) : <>Can't help with anything right now!</>}
                                            </List>
                                        </Typography>
                                    {editHas ?
                                    <div>
                                        <Button onClick={showHasButton}> {displayHas ? <RemoveIcon /> : <AddIcon /> } Add</Button>
                                        {displayHas ? <CreateItemForm
                                            user={user} 
                                            updateCount = {userUpdateCounter} 
                                            userSetter = {setUser} 
                                            counterSetter={setUserUpdateCounter} 
                                            display={displayCan}
                                            setDisplay={setDisplayCan}
                                            isNeed= {false} /> : <div></div>}
                                    </div> : <> </>
                                    }
                                </CardContent>
                            </Card>
                        </div>

                        <div className="profile-card">
                            <Card>
                                <CardContent>
                                    <span className="row">
                                        <Typography className="col-10" variant="h6">Tasks I Can Help With</Typography>
                                        <Button onClick={showEditCanButtons} className = "col-1" align="right"><EditIcon /></Button>
                                    </span>
                                    </CardContent>
                                    <CardContent>
                                        <Typography variant = "subtitle2" >
                                            <List>
                                                {user.can.length ? user.can.map((task, i) => {
                                                    return(
                                                    <ListItem key={i} ><ListItemText primary = {task.name} secondary={task.description}>  </ListItemText>{ editCan ? <Button onClick={() => removeTask(task.id, false )}><RemoveIcon  /></Button> : <></>}</ListItem>
                                                    )
                                                }) : <>No needed tasks!</>}
                                            </List>
                                        </Typography>
                                    {editCan ?
                                    <div>
                                        <Button onClick={showCanButton}> {displayCan ? <RemoveIcon /> : <AddIcon /> } Add</Button>
                                        {displayCan ? <CreateTaskForm
                                            user={user} 
                                            updateCount = {userUpdateCounter} 
                                            userSetter = {setUser} 
                                            counterSetter={setUserUpdateCounter} 
                                            display={displayCan}
                                            setDisplay={setDisplayCan}
                                            isNeed= {false} /> : <div></div>}
                                    </div> : <> </>
                                    }
                                </CardContent>
                            </Card>
                        </div>
                        {/* <Typography variant = "h3">Needs Some Help With: </Typography> */}
                        
                        <div className="profile-card">
                            <Card>
                                <CardContent>
                                    <span className="row">
                                        <Typography className="col-10" variant="h6">Items I Need</Typography>
                                        <Button onClick={showEditNeedsItemsButtons} className = "col-1" align="right"><EditIcon /></Button>
                                    </span>
                                    </CardContent>
                                    <CardContent>
                                        <Typography variant = "subtitle2" >
                                            <List>
                                                {user.needsItems.length ? user.needsItems.map((item, i) => {
                                                    return(
                                                    <ListItem key={i} ><ListItemText primary = {item.name} secondary={item.description}>  </ListItemText>{ editNeedsItems ? <Button onClick={() => removeItem(item.id, true )}><RemoveIcon  /></Button> : <></>}</ListItem>
                                                    )
                                                }) : <>Doesn't need anything now!</>}
                                            </List>
                                        </Typography>
                                    {editNeedsItems ?
                                    <div>
                                        <Button onClick={showItemFormButton}> {displayItemForm ? <RemoveIcon /> : <AddIcon /> } Add</Button>
                                        {displayItemForm ? <CreateItemForm
                                            user={user} 
                                            updateCount = {userUpdateCounter} 
                                            userSetter = {setUser} 
                                            counterSetter={setUserUpdateCounter} 
                                            display={displayCan}
                                            setDisplay={setDisplayCan}
                                            isNeed= {true} /> : <div></div>}
                                    </div> : <> </>
                                    }
                                </CardContent>
                            </Card>
                        </div>
                        
                        <div className="profile-card">
                            <Card>
                                <CardContent>
                                    <span className="row">
                                        <Typography className="col-10" variant="h6">Tasks I Need Help With</Typography>
                                        <Button onClick={showEditNeedsTasksButtons} className = "col-1" align="right"><EditIcon /></Button>
                                    </span>
                                    </CardContent>
                                    <CardContent>
                                        <Typography variant = "subtitle2" >
                                            <List>
                                                {user.needsTasks.length ? user.needsTasks.map((task, i) => {
                                                    return(
                                                    <ListItem key={i} ><ListItemText primary = {task.name} secondary={task.description}>  </ListItemText>{ editNeedsTasks ? <Button onClick={() => removeTask(task.id, true )}><RemoveIcon  /></Button> : <></>}</ListItem>
                                                    )
                                                }) : <>Doesn't need anything now!</>}
                                            </List>
                                        </Typography>
                                    {editNeedsTasks ?
                                    <div>
                                        <Button onClick={showTaskFormButton}> {displayTaskForm ? <RemoveIcon /> : <AddIcon /> } Add</Button>
                                        {displayTaskForm ? <CreateTaskForm
                                            user={user} 
                                            updateCount = {userUpdateCounter} 
                                            userSetter = {setUser} 
                                            counterSetter={setUserUpdateCounter} 
                                            display={displayCan}
                                            setDisplay={setDisplayCan}
                                            isNeed= {true} /> : <div></div>}
                                    </div> : <> </>
                                    }
                                </CardContent>
                            </Card>
                        </div>

                    </div>
                </div>
            </div>
        </Paper>
    )
}