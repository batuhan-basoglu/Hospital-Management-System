import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
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

function RegistrationForm() {
    const classes = useStyles();
    const [gender, setGender] = React.useState('');
    const [maritalStatus, setMaritalStatus] = React.useState('');
    const [province, setProvince] = React.useState('alberta');
    const [state, setState] = React.useState({
        firstname: '',
        lastname: '',
        telephone: '',
        addressLineOne: '',
        city: '',
        provice: '',
        postalCode: '',
        dateOfBirth: '',
        gender : '',
        maritalStatus: '',
        externalDoctor: '',
        divisionID: '',
        //admitted
        //requested
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setState( {
            ...state,
            [e.target.id] : value
        });
    }

    const handleGender = (e) => {
        setGender(e.target.value)
    }

    const handleMaritalStatus = (e) => {
        setMaritalStatus(e.target.value)
    }

    const handleProvinceChange = (e) => {
        setProvince(e.target.value)
    }

    //We call the API HERE
    const register = (e) => {
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
                        label="First Name" 
                        value = {state.firstname}
                        id = "firstname"
                        onChange = {handleChange}
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
                        label="Telephone Number"
                        value={state.telephone}
                        id="telephone"
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        type="date"
                        label="Date of Birth"
                        value={state.dateOfBirth}
                        id="dateOfBirth"
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>

                <div>
                    <TextField
                        required
                        label="Address Line One"
                        value={state.addressLineOne}
                        id="addressLineOne"
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        label="City"
                        value={state.city}
                        id="city"
                        onChange={handleChange}
                    />
                    <TextField
                        select
                        id="userProvince"
                        value={province}
                        onChange={handleProvinceChange}
                        label="Province"
                    >
                        <MenuItem value={'alberta'}>Alberta </MenuItem>
                        <MenuItem value={'britishcolumbia'}>British Columbia</MenuItem>
                        <MenuItem value={'newbrunswick'}>New Brunswick</MenuItem>
                        <MenuItem value={'newfoundlandandlabrador'}>Newfoundland and Labrador</MenuItem>
                        <MenuItem value={'novascotia'}>Nova Scotia</MenuItem>
                        <MenuItem value={'princeedwardisland'}>Prince Edward Island</MenuItem>
                        <MenuItem value={'ontario'}>Ontario</MenuItem>
                        <MenuItem value={'quebec'}>Quebec</MenuItem>
                        <MenuItem value={'saskatchewan'}>Saskatchewan</MenuItem>
                    </TextField>


                    <TextField
                        required
                        label="Postal Code"
                        value={state.postalCode}
                        id="postalCode"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <TextField
                        select
                        required
                        label="Gender"
                        value={ gender}
                        onChange={ handleGender }
                        className={classes.selectEmpty}
                    >
                        <MenuItem value={'male'}> Male </MenuItem>
                        <MenuItem value={'female'}> Female </MenuItem>
                        <MenuItem value={'other'}> Other</MenuItem>
                        <MenuItem value={'none'}>Prefer Not to Identify</MenuItem>
                    </TextField>

                    <TextField
                        select
                        required
                        label="Marital Status"
                        value={maritalStatus}
                        onChange={handleMaritalStatus}
                        className={classes.selectEmpty}
                    >

                        <MenuItem value={'married'}> Married </MenuItem>
                        <MenuItem value={'single'}> Single </MenuItem>
                        <MenuItem value={'commonlaw'}> Common Law</MenuItem>
                    </TextField>
                </div>

                <div>
                    <TextField
                        required
                        label="External Doctor"
                        value={state.externalDoctor}
                        id="telephone"
                        onChange={handleChange}
                    />
                    <TextField
                        label="Division ID"
                        value={state.divisionID}
                        id="divisionid"
                        onChange={handleChange}
                    />
                    
                </div>
                <Button style={{ float: "right", marginRight: "3rem" }}
                    variant="contained"
                    color="primary"
                    onClick = { (e) => register(e)}>
                    Register
                    </Button>
            </form>
        </div>
    )
}

export default RegistrationForm;