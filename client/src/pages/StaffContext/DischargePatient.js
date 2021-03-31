import React from 'react';
import { useQuestions } from 'material-ui-shell/lib/providers/Dialogs/Question';
import { Button } from '@material-ui/core';
import DischargeForm from './DischargeForm';

function DischargePatient(props) {
    const { openDialog, setProcessing } = useQuestions();

    return (
        <Button
            variant="contained"
            color="secondary"
            onClick={() => {

                openDialog({
                    title: 'Consult File',
                    message: <DischargeForm/>,
                    action: null,
                })
            }}
        >
            Discharge Patient
        </Button>
    )
}

export default DischargePatient;