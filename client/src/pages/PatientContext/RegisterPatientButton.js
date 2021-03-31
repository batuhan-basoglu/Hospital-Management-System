import React from 'react';
import { Button } from '@material-ui/core';
import { useQuestions } from 'material-ui-shell/lib/providers/Dialogs/Question';
import RegistrationForm from './RegistrationForm';

function RegisterPatientButton (props) {
    
    const { openDialog, setProcessing } = useQuestions();

    return (
        <Button
            variant="contained"
            color="primary"
            style={{marginBottom: '16px'}}
            onClick={() => {

                openDialog({
                    title: 'Register Patient',
                    message: <RegistrationForm/>,
                    action: null,
                })
            }}
        >
            Register Patient
        </Button>
    )
}

export default RegisterPatientButton;