import React from 'react';
import Page from 'material-ui-shell/lib/containers/Page';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createDivision(id, name, location, numOfBeds, chargeNurse, ext, status) {
    return { id, name, location, numOfBeds, chargeNurse, ext, status };
}

const rows = [
    createDivision(2421, 'Orthopedic', 'Bay 6', 6, "Ella", 2 , false),
    createDivision(1343, 'Emergency', 'Ward 6', 1, 'Johnson', 1, true),
    createDivision(5413, 'Psychiatric', 'Ward 11', 3, "Taggart", 5, true),
    createDivision(8193, 'Cardiac', 'Ward 4', 5, "Vaquez", 8, false),
];

function DivisionView ()  {

    const classes = useStyles();

    React.useEffect ( () => {
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
                //we feed the data into the function to create division object
                //const dataRows = data.map((division) => {
                   // return createDivision(division.id, division.name, division.location, division.numOfBeds, division.hargeNurse, division.ext, division.status);
                //})
            }).catch(e => {
                console.error(e);
            });
    })

    return (
        <Page pageTitle='Division Context' >
          <div style={{padding: '32px'}}>
          <Typography variant="h4" style={{ marginBottom: "32px" }}> Division Vizualization</Typography>

<TableContainer component={Paper}>
    <Table className={classes.table} aria-label="simple table">
        <TableHead>
            <TableRow>
                <TableCell>ID </TableCell>
                <TableCell> Name</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Num of Beds</TableCell>
                <TableCell> Charge Nurse </TableCell>
                <TableCell> Telephone Ext. </TableCell>
                <TableCell> Status </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {rows.map((row) => (
                <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.location}</TableCell>
                    <TableCell>{row.numOfBeds}</TableCell>
                    <TableCell>{row.chargeNurse}</TableCell>
                    <TableCell>{row.ext}</TableCell>
                    <TableCell>{row.status ? "Complete" : "Incomplete"}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
</TableContainer>
          </div>
        </Page>
    )
}

export default DivisionView;