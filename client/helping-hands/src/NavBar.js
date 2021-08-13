import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"
import HomeIcon from '@material-ui/icons/Home';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { AppBar, Toolbar } from '@material-ui/core';

export default function NavBar() {
    return (
    <Paper>    
        <AppBar className="navBar" align="center">
            <span className="row" align="center">
                <span className="col-3" align="left">
                    <Link to="/"><Button variant="contained" color="primary"><HomeIcon /></Button></Link> 
                </span>
                <span className="col-2" align="center">
                    <Link to="/my-haves"><Button variant="contained" color="primary"><FormatListBulletedIcon /> My Haves </Button></Link>
                </span>
                <span className="col-2" align="center">
                    <Link to="/my-needs"><Button  variant="contained" color="primary"><FormatListBulletedIcon /> My Needs</Button></Link>   
                </span>
                <span className="col-2" align="center">
                    <Link to="/search"><Button variant="contained" color="primary"><SearchIcon />Search </Button></Link>
                </span>
                <span className="col-3" align="right">
                    <Link to="/profile"><Button variant="contained" color="primary"><AccountCircleIcon /></Button></Link>
                </span>
            </span>
        </AppBar>
    </Paper>
    )
}