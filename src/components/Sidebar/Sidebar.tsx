import React, { FC } from 'react';
import { List, ListItem } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
// Styles
import useStyles from './sidebarStyles';

const Sidebar: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.drawerContainer}>
      <List component='nav'>
        <NavLink to='/messages' className={classes.sidebarLink}>
          <ListItem button>+ Message</ListItem>
        </NavLink>
        <NavLink to='/templates' className={classes.sidebarLink}>
          <ListItem button>Create template</ListItem>
        </NavLink>
        <NavLink to='/lists' className={classes.sidebarLink}>
          <ListItem button>Mailing List</ListItem>
        </NavLink>
        <NavLink to='/settings' className={classes.sidebarLink}>
          <ListItem button>Settings</ListItem>
        </NavLink>
      </List>
    </div>
  );
};

export default Sidebar;
