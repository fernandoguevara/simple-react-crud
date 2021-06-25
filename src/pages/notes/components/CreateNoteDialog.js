import {React, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { addNewNote, selectError, selectDialog, openDialogNote } from "../../../core/slice/notesSlice";

const validationSchema = yup.object({
    title: yup
      .string('Enter your title')
      .required('Title is required')
      .min(5, 'Password should be of minimum 5 characters length')
      .max(200, 'Password should be of maximum 200 characters length')
      ,
    description: yup
      .string('Enter your title')
      .required('Description is required')
      .min(10, 'Password should be of minimum 10 characters length')
      .max(500, 'Password should be of maximum 500 characters length')
});

export default function CreateNoteDialog(){

    const dispatch = useDispatch();
    const dialogOpened = useSelector(selectDialog);
    const error = useSelector(selectError);

    //console.log(dialogOpened);

    const handleClose = () => {
        dispatch(openDialogNote(false));
    }

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
        },
        validationSchema: validationSchema,
        onSubmit: (note, {resetForm}) => {
          dispatch(addNewNote(note));
          if(!error){
            dispatch(openDialogNote(false));
            resetForm();
          }
        },
    });
    

    return(
        <Dialog open={dialogOpened} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create Note</DialogTitle>
            <DialogContent>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="text"
                        fullWidth
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        error={formik.touched.title && Boolean(formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        multiline
                        rows={8}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                    />
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
            
        </Dialog>
    );
}