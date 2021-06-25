import {React, useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useKeycloak } from '@react-keycloak/web'
import CreateNoteDialog from "../pages/notes/components/CreateNoteDialog";
import { useSelector, useDispatch } from 'react-redux';
import {openDialogNote} from "../core/slice/notesSlice";

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
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
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

export default function Header() {
  const classes = useStyles();

  const { keycloak } = useKeycloak();
  const dispatch = useDispatch();

  const onLogin = () => {
    keycloak.login({redirectUri: window.location.origin + "/notes"});
  }

  const onLogout = () => {
    keycloak.logout({redirectUri: window.location.origin});
  }

  const onOpenCreateNote = () => {
    dispatch(openDialogNote(true));
  }

  return (
    <div className={classes.grow}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Notes
          </Typography>
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
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>

            {window.location.pathname == '/notes' &&
              <IconButton aria-label="show 4 new mails" color="inherit" onClick={onOpenCreateNote}>
                <AddCircleIcon />
              </IconButton>
            }
             
            {!keycloak.authenticated && (
              <IconButton aria-label="show 17 new notifications" color="inherit" onClick={onLogin}>
                <AccountCircle />
              </IconButton>
            )}

            {keycloak.authenticated && (
              <IconButton edge="end" aria-haspopup="true" color="inherit" onClick={onLogout}>
                <ExitToAppIcon />
              </IconButton>
            )}

          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-haspopup="true"
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      
      <CreateNoteDialog/>
    </div>
  );
}
