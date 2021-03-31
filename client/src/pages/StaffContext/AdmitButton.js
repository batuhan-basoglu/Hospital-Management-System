import React from 'react';
import { useQuestions } from 'material-ui-shell/lib/providers/Dialogs/Question';
import { Button } from '@material-ui/core';
import AdmitForm from './AdmitForm';

function AdmitButton(props) {
    const { openDialog, setProcessing } = useQuestions();

    return (
        <Button
            variant="contained"
            color="default"
            onClick={() => {

                openDialog({
                    title: 'Consult File',
                    message: <AdmitForm firstname={props.firstname}  lastname={props.lastname}/> ,
                    action: null,
                })
            }}
        >
            Admit Patient 
        </Button>
    )
}

export default AdmitButton;