import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { AppBar, Toolbar } from '@material-ui/core';
import NavBarMenu from './NavBarMenu';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import { findUserByName } from "./search/search-user";
import { Redirect } from "react-router";

export default function NavBar() {

    const useStyles = makeStyles((theme) => ({
        grow: {
          flexGrow: 1,
        },
        linkButton: {
          color: "antiquewhite"
        },
        search: {
          position: 'relative',
          borderRadius: theme.shape.borderRadius,
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

    const searchUserByName = (name) => {
        
    }

    return (   
        <AppBar>
            <Toolbar>
                <Link className={classes.linkButton} to="/">
                  <IconButton edge="start" color="inherit" aria-label="home"><HomeIcon /></IconButton>
                </Link>
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
              <Link className={classes.linkButton} to="/profile">
                  <IconButton align="right" edge="start" color="inherit" aria-label="profile">
                      <AccountCircleIcon />
                  </IconButton>
              </Link>
            </Toolbar>
        </AppBar>
    )
}
