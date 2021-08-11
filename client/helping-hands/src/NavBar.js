import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"

export default function NavBar() {
    return (
    <Paper>    
        <nav className="navBar" align="center">
        <span className="row" align="center">
            <span className="col-3" align="left">
                <Link to="/"><Button variant="contained" color="primary" className="btn btn-info ">Home</Button></Link> 
            </span>
            <span className="col-2" align="center">
                <Link to="/my-haves"><Button className="btn btn-info" variant="contained" color="primary">My Haves </Button></Link>
            </span>
            <span className="col-2">
                <Link to="/my-needs"><Button  variant="contained" color="primary" className="btn btn-info">My Needs</Button></Link>   
            </span>
            <span className="col-2" align="right">
                <Link to="/search"><Button className="btn btn-info" variant="contained" color="primary">Search </Button></Link>
            </span>
            <span className="col-3" align="right">
                <Link to="/profile"><Button variant="contained" color="primary" className="btn btn-info">Profile</Button></Link>
            </span>
            </span>
        </nav>
    </Paper>
    )
}