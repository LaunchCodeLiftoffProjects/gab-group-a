import React, { useState, useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import Card from "@material-ui/core/Card";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import "./Profile.css";

export default function Profile() {
    const userPlaceholder = {
        name: "Colyn Gremaud",
        location: "Tower Grove",
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

    return (
        <Paper>
            <div className="container profile-container">
                <div className="row">
                    <div className="col-3">
                        <p><CardActionArea>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5">{userPlaceholder.name}</Typography>
                                    <Typography variant="subtitle1">{userPlaceholder.location}</Typography>
                                </CardContent>
                            </Card>
                        </CardActionArea></p>
                    </div>
                    <div className="col-8" align="left">
                        <p><CardActionArea>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">Haves</Typography>
                                    <Typography variant = "subtitle3" >
                                        <ul >
                                            {userPlaceholder.has.map((item) => {
                                                return(
                                                <li>{item.name}</li>
                                                )
                                            })}
                                        </ul>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </CardActionArea></p>
                    {/* <div className="col-9" align="left"> */}
                    <CardActionArea>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">Needs</Typography>
                                    <Typography variant = "subtitle3" >
                                        <ul >
                                            {userPlaceholder.needs.map((item) => {
                                                return(
                                                <li>{item}</li>
                                                )
                                            })}
                                        </ul>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </CardActionArea>
                    {/* </div> */}
                    </div>
                </div>
            </div>
        </Paper>
    )
}