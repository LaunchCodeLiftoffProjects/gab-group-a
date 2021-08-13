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
import NavBarMenu from './NavBarMenu';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';


export default function NavBar() {

    const useStyles = makeStyles((theme) => ({
        grow: {
          flexGrow: 1,
        },
        menuButton: {
          marginRight: theme.spacing(2),
        },
        title: {
          display: 'none',
          [theme.breakpoints.up('sm')]: {
            display: 'block',
          },
        },
        search: {
          position: 'relative',
          borderRadius: theme.shape.borderRadius,
        //   backgroundColor: alpha(theme.palette.common.white, 0.15),
        //   '&:hover': {
        //     backgroundColor: alpha(theme.palette.common.white, 0.25),
        //   },
          marginRight: theme.spacing(2),
          marginLeft: 0,
          width: '100%',
          [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
          },
        },
        searchIcon: {
          padding: theme.spacing(0, 2),
          height: '100%',
          position: 'absolute',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        inputRoot: {
          color: 'inherit',
        },
        inputInput: {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('md')]: {
            width: '20ch',
          },
        },
        sectionDesktop: {
          display: 'none',
          [theme.breakpoints.up('md')]: {
            display: 'flex',
          },
        },
        sectionMobile: {
          display: 'flex',
          [theme.breakpoints.up('md')]: {
            display: 'none',
          },
        },
      }));
      
    const classes = useStyles();

    return (
    <Paper>    
        <AppBar align="center">
            <Toolbar>
            
                
                    <Link to="/"><IconButton edge="start" color="inherit" aria-label="home"><HomeIcon /></IconButton></Link>
                
                
                    <NavBarMenu />
                
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                            <SearchIcon />
                            </div>
                        <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.grow}></div>
                
                    <Link to="/profile"><IconButton align="right" edge="start" color="inherit" aria-label="profile"><AccountCircleIcon /></IconButton></Link>
                
            
            </Toolbar>
        </AppBar>
    </Paper>
    )
}


{/* <span className="row" align="center">
        <span className="col-3" align="left">
            <Link to="/"><Button variant="contained" color="primary"><HomeIcon /></Button></Link> 
        </span>
        <span className="col-3" align="left">
            <NavBarMenu /> 
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
    </span> */}