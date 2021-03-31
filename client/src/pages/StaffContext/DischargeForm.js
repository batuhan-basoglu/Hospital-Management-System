import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
            width: '25ch',
        },
    },
    selectEmpty: {
        marginTop: theme.spacing(1),
        width: '25ch',
    },
}));


function DischargeForm() {

    const classes = useStyles();
    const [state, setState] = React.useState({
        id: '',
        firstname: '',
        lastname: '',
        division: '',
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.id]: value
        });
    }

    const discharge = (e) => {
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

        fetch('/ ', options)
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                //What happens after calling express goes here
            }).catch(e => {
                console.error(e);
            });
    }

    return (
        <div>
            <form className={classes.root} autoComplete="off">
                <div>
                    <TextField
                        required
                        label="ID"
                        value={state.id}
                        id="id"
                        onChange={handleChange}
                    />

                    <TextField
                        required
                        label="Division"
                        value={state.division}
                        id="division"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <TextField
                        required
                        label="First Name"
                        value={state.firstname}
                        id="firstname"
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        label="First Name"
                        value={state.firstname}
                        id="firstname"
                        onChange={handleChange}
                    />
                </div>


                <Button style={{ float: "right", marginRight: "3rem" }}
                    variant="contained"
                    color="primary"
                    onClick={(e) => discharge(e)}
                    value = "Confirm Discharge">
                    Confirm Discharge
                </Button>
            </form>
        </div>
    )
}

export default DischargeForm;