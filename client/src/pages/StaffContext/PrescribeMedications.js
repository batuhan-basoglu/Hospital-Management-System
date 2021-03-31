import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

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

function PrescribeMedications(){
    const classes = useStyles();
    const [state, setState] = React.useState({
        firstname: '',
        lastname: '',
        drugnumber: '',
        drugname: '',
        unitsbyday: '',
        numberofadmin: '',
        administrationtime1: '',
        administrationunits1: '',
        administrationtime2: '',
        administrationunits2: '',
        administrationtime3: '',
        administrationunits3: '',
        methodofadmin: '',
        startdate: '',
        finishdate: '',
    })

    const handleChange = (e) => {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.id]: value
        });
    }

    const prescribe = (e) => {
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

    return(
        <div>
            < Typography variant="h5" style={{padding: "1rem"}}> Prescribe Medications </Typography>

            <form className={classes.root} autoComplete="off">
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
                        label="Last Name"
                        value={state.lastname}
                        id="lastname"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <TextField
                        required
                        label="Drug Number"
                        value={state.drugnumber}
                        id="drugnumber"
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        label="Drug Name"
                        value={state.drugname}
                        id="drugname"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <TextField
                        required
                        label="Units by Day"
                        value={state.unitsbyday}
                        id="unitsbyday"
                        onChange={handleChange}
                    />
                </div>

                <Typography variant="h6" style={{ padding: "1rem" }}>  Admin Information</Typography>

                <div>
                    <TextField
                        required
                        label="Number of Administrations"
                        value={state.numberofadmin}
                        id="numberofadmin"
                        onChange={handleChange}
                        helperText="Per Day"
                    />
                </div>

                <div>
                    <TextField
                        type="time"
                        value={state.adminstrationtime1}
                        id="adminstrationtime1"
                        onChange={handleChange}
                        helperText="Admnistration Time 1"
                    />

                    <TextField
                        label="Admnistration Units 1"
                        value={state.administrationunits1}
                        id="administrationunits1"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <TextField
                        type="time"
                        value={state.adminstrationtime2}
                        id="adminstrationtime1"
                        onChange={handleChange}
                        helperText="Admnistration Time 2"
                    />

                    <TextField
                        label="Admnistration Units 1"
                        value={state.administrationunits2}
                        id="administrationunits2"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <TextField
                        type="time"
                        value={state.adminstrationtime3}
                        id="adminstrationtime3"
                        onChange={handleChange}
                        helperText="Admnistration Time 3"
                    />

                    <TextField
                        label="Admnistration Units 3"
                        value={state.administrationunits3}
                        id="administrationunits3"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <TextField
                        required
                        label ="Method of Administration"
                        value={state.methodofadmin}
                        id="methodofadmin"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <TextField
                        type="date"
                        value={state.startdate}
                        id="startdate"
                        onChange={handleChange}
                        helperText="Start Date"
                    />

                    <TextField
                        type="date"
                        value={state.finishdate}
                        id="finishdate"
                        onChange={handleChange}
                        helperText="Finish Date"
                    />
                </div>
                




                <Button style={{ float: "right", marginRight: "3rem" }}
                    variant="contained"
                    color="primary"
                    onClick={(e) => prescribe(e)}>
                    Prescibe Medication 
                    </Button>
            </form>
        </div>
    )
}

export default PrescribeMedications;