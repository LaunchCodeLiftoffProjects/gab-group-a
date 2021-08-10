import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

export default function NavBar() {
    return (
    <Paper>    
        <nav className="navBar" align="center">
        <span className="row" align="center">
            <span className="col-3" align="left">
                <Button variant="contained" color="primary" className="btn btn-info "><Link to="/">Home</Link></Button> 
            </span>
            <span className="col-2" align="center">
                <Button className="btn btn-info" variant="contained" color="primary"><Link to="/my-haves">My Haves</Link> </Button>
            </span>
            <span className="col-2">
                <Button  variant="contained" color="primary" className="btn btn-info"><Link to="/my-needs">My Needs</Link></Button>   
            </span>
            <span className="col-2" align="right">
                <Button className="btn btn-info" variant="contained" color="primary"><Link to="/search">Search</Link> </Button>
            </span>
            <span className="col-3" align="right">
                <Button variant="contained" color="primary" className="btn btn-info"><Link to="/profile">Profile</Link></Button></span>
            </span>
        </nav>
    </Paper>
    )
}