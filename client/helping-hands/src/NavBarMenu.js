import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import { IconButton } from '@material-ui/core';

export default function NavBarMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton aria-controls="simple-menu" aria-haspopup="true" color="inherit" onClick={handleClick}>
        <FormatListBulletedIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to="/"><MenuItem onClick={handleClose}>Home Page</MenuItem></Link>
        <Link to="/profile"><MenuItem onClick={handleClose}>Profile</MenuItem></Link>
        <MenuItem onClick={handleClose}>View Item Matches</MenuItem>
        <MenuItem onClick={handleClose}>View Task Matches</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
