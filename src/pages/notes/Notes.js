import {React, useEffect, useCallback, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import NoteCard from "./components/NoteCard";
import { fetchNotes, selectAllNotes } from "../../core/slice/notesSlice";
import { useSelector, useDispatch } from 'react-redux';
import { useKeycloak } from '@react-keycloak/web';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
}));


export default function Notes() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const notes = useSelector(selectAllNotes);

  const noteStatus = useSelector(state => state.notes.status);

  useEffect(() => {
    if (noteStatus === 'idle') {
      dispatch(fetchNotes());
    }
  }, [noteStatus, dispatch]);

  return (
    <div className={classes.root}>
      <GridList cols={4}>

      {notes.map((note) => (
        <Fade key={note.id} timeout={500} in={true}>
          <GridListTile key={note.id}>
            <NoteCard note={note}/>
          </GridListTile>
        </Fade>
      ))}
        
      </GridList>
    </div>
  );
}
