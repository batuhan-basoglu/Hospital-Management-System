import React from 'react';
import { Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

function RequestToAdmitButton() {

        const classes = useStyles();
        const [open, setOpen] = React.useState(false);

        const handleClick = (e) => {
            //send to database 
            e.preventDefault();

            var data = { // what to send goes here
            }

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify(data)
            };

            //create a request for admission here
            fetch('/ ', options)
                .then(res => res.json())
                .catch(e => {
                    //console.error(e);
                });
            
            setOpen(true);
        };

        const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }

            setOpen(false);
        }

        return (
            <div className={classes.root}>
                <Button
                    variant="contained"
                    color="default"
                    onClick={ handleClick } >
                    Request To Admit
                </Button>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Successfully Requested Patient for Admission
                    </Alert>
                </Snackbar>
            </div>
        )
}

export default RequestToAdmitButton;