import React from 'react';
import Page from 'material-ui-shell/lib/containers/Page';
import Typography from '@material-ui/core/Typography';
import AdmissionRequests from './AdmissionRequests';
import PrescribeMedications from './PrescribeMedications';
import DischargePatient from './DischargePatient';

const StaffContext = (props) => {

    //interchange between "CHARGE NURSE" and "MEDICAL" to see different actions
    //get this using (props.accessType) or similar. Send props in wrapper
    const [accessType, setAccessType] = React.useState('CHARGE NURSE') ; 

    if (  accessType === 'MEDICAL'){
        return (
            <Page pageTitle='Staff Context' >
                <Typography variant="h4" style={{ padding: "1rem" }}> Available Actions for Doctor</Typography>
                <PrescribeMedications/>
            
            </Page>
        )
    } else if (accessType === "CHARGE NURSE"){
        return (
            <Page pageTitle='Staff Context' >
                <div style={{padding: 64}}>

                <Typography variant="h4" style={{marginBottom: 16}}> Available Actions for Charge Nurse</Typography>
                <DischargePatient />
                <AdmissionRequests/>
                </div>
            </Page>
        )
    }
    
}
export default StaffContext;
