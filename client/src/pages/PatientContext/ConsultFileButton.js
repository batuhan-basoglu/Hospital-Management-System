import React from 'react';
import { Button } from '@material-ui/core';
import { useQuestions } from 'material-ui-shell/lib/providers/Dialogs/Question';
import ConsultFileForm from './ConsultFileForm'

//we should have medication somewhere inside here
function ConsultFileButton(props){
    const { openDialog, setProcessing } = useQuestions();

    return (
        <Button
            variant="contained"
            color="default"
            onClick={() => {

                openDialog({
                    title: 'Consult File',
                    message: <ConsultFileForm firstname= {props.firstname} lastname= {props.lastname} />,
                    action: null,
                })
            }}
        >
            Consult File 
        </Button>
    )
}

export default ConsultFileButton;