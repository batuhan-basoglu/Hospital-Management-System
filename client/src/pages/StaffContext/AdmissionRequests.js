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
import AdmitButton from './AdmitButton';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(id, firstname, lastname) {
    return { id, firstname, lastname };
}

const rows = [
    createData(2421, 'James', 'Iger' ),
    createData(1343, 'Bob', 'Andrews'),
    createData(5413, 'John', 'Dunderson'),
    createData(8193, 'Sam', 'Ellis' ),
];

function AdmissionRequests() {

    const classes = useStyles();
    React.useEffect( () => {
        getData();
    })

    function getData(){
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
                const dataRows = data.map((patient) => {
                    return createData(patient.id, patient.firstname, patient.lastname );
                })
            }).catch(e => {
                console.error(e);
            });
    }

    return (
        <div>
            <Page pageTitle='Summary' >

                <Typography variant="h4" style={{marginBottom: 16}}> Admission Requests </Typography>


                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID </TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell> Action </TableCell> 
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.firstname}</TableCell>
                                    <TableCell>{row.lastname}</TableCell>
                                    <TableCell  >
                                        <AdmitButton
                                            firstname = {row.firstname}
                                            lastname = {row.lastname}>
                                        </AdmitButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Page>
        </div>
    )

}

export default AdmissionRequests;