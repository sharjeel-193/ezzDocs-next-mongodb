import {Modal, Fade, Box, Typography, TextField, Button, Backdrop} from '@mui/material'
function CreateDocumentModal(props) {
    const {docModal, closeDocModal, setDocNameInput, createDocument} = props
    return (
        <Modal
            open={docModal}
            onClose={closeDocModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={docModal}>
                <Box
                    sx={{
                        width: '80%',
                        maxWidth: '500px',
                        backgroundColor:'white',
                        padding: 3,
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        borderRadius: 3
                    }}
                >
                    <Typography variant="h5" component="h2" marginBottom={3}>Create New Document</Typography>
                    <TextField 
                        type={'text'} 
                        variant='outlined' 
                        fullWidth 
                        label='Document Name'
                        onChange={(e) => setDocNameInput(e.target.value)}    
                    />
                    <Box
                        sx={{
                            width: '100%',
                            textAlign:'right',
                        }}
                        marginTop={3}
                    >
                        <Button variant='contained' sx={{textTransform: 'capitalize'}} onClick={createDocument}>Create</Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    )
}

export default CreateDocumentModal