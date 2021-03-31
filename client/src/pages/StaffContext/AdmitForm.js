import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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

function AdmitForm(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        firstname: props.firstname,
        lastname: props.lastname,
        division: '',
        localdoctor: '',
        roomnumber: '',
        bednumber: '',
        privateinsurancenumber: '',
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.id]: value
        });
    }


    //We call the API HERE
    const admit = (e) => {
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
                        disabled
                        label="First Name"
                        value={state.firstname}
                    />
                    <TextField
                        disabled
                        label="Last Name"
                        value={state.lastname}
                    />
                </div>
                <div>
                    <TextField
                        required
                        label="Division"
                        value={state.division}
                        id="division"
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        label="Local Doctor"
                        value={state.localdoctor}
                        id="localdoctor"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <TextField
                        required
                        label="Room Number"
                        value={state.roomnumber}
                        id="roomnumber"
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        label="Bed Number"
                        value={state.bednumber}
                        id="bednumber"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <TextField
                        label="Private Insurance Number"
                        value={state.privateinsurancenumber}
                        id="privateinsurancenumber"
                        onChange={handleChange}
                        helperText= "Optional"
                    />
                </div>

                
                <Button style={{ float: "right", marginRight: "3rem" }}
                    variant="contained"
                    color="primary"
                    onClick={(e) => admit(e)}>
                    Confirm Admission
                    </Button>
            </form>
        </div>
    )
}

export default AdmitForm;