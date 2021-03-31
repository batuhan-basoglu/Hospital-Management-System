import React from 'react';
import Page from 'material-ui-shell/lib/containers/Page';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { RegisterPatientButton, ConsultFileButton, RequestToAdmitButton } from './Buttons';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(id, firstname, lastname, division, admitted) {
    return { id, firstname, lastname, division, admitted  };
}

const rows = [
    createData(2421, 'James', 'Iger', 6, false),
    createData( 1343, 'Bob', 'Andrews', 1, true),
    createData(5413, 'John', 'Dunderson', 3, true),
    createData(8193, 'Sam', 'Ellis', 5, false),

];

function PatientList() {

    const classes = useStyles();

    React.useEffect( () => {
        getData();
    })

    function getData (){
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
        };
        
        fetch('/', options)
            .then(res => res.json())
            .then((data) => {
                //we feed the data into the function to create patient object
                const dataRows = data.map ( (patient) => {
                    return createData( patient.id, patient.firstname, patient.lastname, patient.division, patient.admitted);
                })
            }).catch(e => {
                console.error(e);
            });
    }

    return (
        <Page pageTitle='Summary' >
            <div style={{padding: '32px'}}>

            <Typography variant="h3" style={{marginBottom: '16px'}}>  Patient List </Typography>

<RegisterPatientButton />

<TableContainer component={Paper}>
    <Table className={classes.table} aria-label="simple table">
        <TableHead>
            <TableRow>
                <TableCell>ID </TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Division</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {rows.map((row) => (
                <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.firstname}</TableCell>
                    <TableCell>{row.lastname}</TableCell>
                    <TableCell>{row.division}</TableCell>
                    <TableCell>
                        <ConsultFileButton
                            firstname = {row.firstname}
                            lastname = {row.lastname}
                        />
                    </TableCell>
                    <TableCell  >
                        <div hidden={row.admitted}>
                            <RequestToAdmitButton
                                firstname={row.firstname}
                                lastname={row.lastname}
                            />
                        </div>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
</TableContainer>

            </div>
        </Page>

    )
}

export default PatientList;
