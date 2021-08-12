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

export default function Profile() {
    const userPlaceholder = {
        name: "Colyn Gremaud",
        location: "Tower Grove",
        email: "cgremaud@email.net",
        needs: [
            "Windows washed",
            "Hamsters fed",
        ],
        has: [
        {
            name: "school supplies",
            quantity: 20
        },
        {
            name: "diapers",
            quantity: 15
        }
        ],
        can: [
        {
            name: "fix cars",
            hoursWork: 12
        },
        {
            name: "walk dogs",
            hoursWork: 3
        }
    ]}

    const [user, setUser] = useState();
    const [loaded, setLoaded] = useState(false);

    const fetchUser = async () => {
        let response = await fetch("http://localhost:8080/users/1")

        let json = await response.json();
        setUser(json);
        setLoaded(true)
    }

    useEffect(() => {
        try{
            fetchUser()
            console.log(user)
        } catch(err) {
            console.log(err)
        }
    }, [])
    if(!loaded) {
        return <div>Loading . . .</div>
    } else return (
        <Paper>
            <div className="container profile-container">
                <div className="row">
                    <div className="col-4">
                        <p><CardActionArea>
                            <Card>
                                <CardContent>
                                    <span className="container row"><Avatar className="col-1">{user.name[0]}</Avatar><Typography className="col-8" variant="h6">{user.name}</Typography></span>
                                    <p><br /><Typography variant="subtitle1">{user.location}</Typography></p>
                                    <p><Typography variant="subtitle1">{userPlaceholder.email}</Typography></p>
                                </CardContent>
                            </Card>
                        </CardActionArea></p>
                    </div>
                    <div className="col-8" align="left">
                        <p className="profile-card"><CardActionArea>
                            <Card >
                                <CardContent>
                                    <span className="row">
                                        <Typography className="col-10" variant="h6">Has</Typography>
                                        <Button className = "col-1" align="right"><EditIcon /></Button>
                                    </span>
                                    <Typography variant = "subtitle2" >
                                        <ul >
                                            {userPlaceholder.has.map((item, i) => {
                                                return(
                                                <li key={i}>{item.name}</li>
                                                )
                                            })}
                                        </ul>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </CardActionArea></p>
                        <p className="profile-card">
                            <CardActionArea>
                                <Card>
                                    <CardContent>
                                        <span className="row">
                                            <Typography className="col-10" variant="h6">Can</Typography>
                                            <Button className = "col-1" align="right"><EditIcon /></Button>
                                        </span>
                                        <Typography variant = "subtitle2" >
                                            <ul >
                                                {userPlaceholder.can.map((item, i) => {
                                                    return(
                                                    <li key={i}>{item.name} ({item.hoursWork} hrs)</li>
                                                    )
                                                })}
                                            </ul>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </CardActionArea>
                        </p>
                        <p className="profile-card">
                            <CardActionArea>
                                <Card>
                                    <CardContent>
                                        <span className="row">
                                            <Typography className="col-10" variant="h6">Needs</Typography>
                                            <Button className = "col-1" align="right"><EditIcon /></Button>
                                        </span>
                                        <Typography variant = "subtitle2" >
                                        <ul>
                                            {userPlaceholder.needs.map((item, i) => {
                                                return(
                                                <li key={i}>{item}</li>
                                                )
                                            })}
                                        </ul>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </CardActionArea>
                        </p>
                    </div>
                </div>
            </div>
        </Paper>
    )
}