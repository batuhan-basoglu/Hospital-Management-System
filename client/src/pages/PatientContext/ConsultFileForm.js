import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
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

function ConsultFileForm (props){

    const classes = useStyles();
    const [gender, setGender] = React.useState('');
    const [maritalStatus, setMaritalStatus] = React.useState('');
    const [province, setProvince] = React.useState('');
    const [state, setState] = React.useState({
        firstname: '',
        lastname: '',
        telephone: '',
        addressLineOne: '',
        city: '',
        provice: '',
        postalCode: '',
        dateOfBirth: '',
        gender: '',
        maritalStatus: '',
        externalDoctor: '',
        divisionID: '',
        //admitted
        //requested
    });

    React.useEffect( () => {
        getData(); //we get data right after render
    })

    //GEt from backend
    function getData(){
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
        };

        fetch('/ ', options)
            .then(res => res.json())
            .then((data) => {
                //What happens after calling express goes here

                 setState( {
                     firstname: data.firstname,
                     lastname: data.lastname,
                     telephone: data.telephone,
                     addressLineOne: data.addressLineOne,
                     city: data.city,
                     provice: data.province,
                    postalCode: data.postalCode,
                     dateOfBirth: data.dateOfBirth,
                     gender: data.gender,
                     maritalStatus: data.maritalStatus,
                     externalDoctor: data.externalDoctor,
                     divisionID: data.divisionID,
                })
            }).catch(e => {
                //console.error(e);
            });
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.id]: value
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

    const [editable, setEditable] = React.useState(false);
    const [buttonValue, setButtonValue] = React.useState('Edit');

    function saveOrEdit(e){
        if ( editable){
            setButtonValue( 'Edit');
            setEditable(false);
        }else{
            saveData(e); 
            setButtonValue('Save');
            setEditable(true);
        }
    }

    //Send Data to Backend
    function saveData(e){
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
                //What happens after calling express goes here
            }).catch(e => {
                //console.error(e);
            });
    }

    return(
        <div>
            <form className={classes.root} autoComplete="off">
                <div>
                    <TextField
                        disabled = {!editable}
                        required
                        label="First Name"
                        value={state.firstname}
                        id="firstname"
                        onChange={handleChange}
                    />
                    <TextField
                        disabled={!editable}
                        required
                        label="Last Name"
                        value={state.lastname}
                        id="lastname"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <TextField
                        disabled={!editable}
                        required
                        label="Telephone Number"
                        value={state.telephone}
                        id="telephone"
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        disabled={!editable}
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
                        disabled={!editable}
                        required
                        label="Address Line One"
                        value={state.addressLineOne}
                        id="addressLineOne"
                        onChange={handleChange}
                    />
                    <TextField
                        disabled={!editable}
                        required
                        label="City"
                        value={state.city}
                        id="city"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <TextField
                        disabled={!editable}
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
                        disabled={!editable}
                        label="Postal Code"
                        value={state.postalCode}
                        id="postalCode"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <TextField
                        select
                        disabled={!editable}
                        required
                        label="Gender"
                        value={gender}
                        onChange={handleGender}
                        className={classes.selectEmpty}
                    >
                        <MenuItem value={'male'}> Male </MenuItem>
                        <MenuItem value={'female'}> Female </MenuItem>
                        <MenuItem value={'other'}> Other</MenuItem>
                        <MenuItem value={'none'}>Prefer Not to Identify</MenuItem>
                    </TextField>

                    <TextField
                        select
                        disabled={!editable}
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
                        disabled={!editable}
                        required
                        label="External Doctor"
                        value={state.externalDoctor}
                        id="telephone"
                        onChange={handleChange}
                    />
                    <TextField
                        disabled={!editable}
                        label="Division ID"
                        value={state.divisionID}
                        id="divisionid"
                        onChange={handleChange}
                    />

                </div>

                <Button style={{ float: "right", marginRight: "2rem" }}
                    variant="contained"
                    color="primary"
                    onClick={(e) => saveOrEdit(e)}>
                    {buttonValue}
                </Button>
            </form>
        </div>
    )
}

export default ConsultFileForm;

