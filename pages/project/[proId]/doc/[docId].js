import { Box, Container, useTheme, Typography, Paper, Modal, Backdrop, Fade, Button, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ErrorBox from '../../../../components/ErrorBox'
import Loading from '../../../../components/Loading'
import { server } from '../../../../util/server'
import TextEditor from '../../../../components/TextEditor'
import { toast, ToastContainer } from 'react-toastify'

function Document(props) {
    const {documents} = props
    const [currentDoc, setCurrentDoc] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [docName, setDocName] = useState('')
    const theme = useTheme()
    const router = useRouter()
    const { docId } = router.query
    const openModal = () => {
        console.log('OEN MOdel')
        setShowModal(true)
    }
    const closeModal = () => {
        setShowModal(false)
    }
    useEffect(() => {
        if(documents.documents){
            setCurrentDoc(documents.documents.filter(doc => doc._id == docId)[0])
            console.log({Current: currentDoc})
            if(currentDoc){
                setDocName(currentDoc.name)
            }
        }
    }, [documents, docId, currentDoc])

    const updateDocName = () => {
        fetch(`/api/docs/${docId}/edit`, {
            body:JSON.stringify({
                name: docName
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "PUT",
        })
        .then((res) => res.json())
        .then((data) => {
            
            if(data.statusCode == 200){
                console.log({Data: data})
                setDocName(data.document.name)
                setCurrentDoc({
                    ...currentDoc,
                    name: data.document.name
                })
                closeModal()
                toast.success(data.message)
            } else {
                console.log({Error: data})
                
            }
        })
    }

    const editDocNameModal = (
        <Modal
            open={showModal}
            onClose={closeModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={showModal}>
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
                    <Typography variant="h5" component="h2" marginBottom={3}>Create New Project</Typography>
                    <TextField 
                        type={'text'} 
                        variant='outlined' 
                        value={docName}
                        fullWidth 
                        label='Document Name'
                        onChange={(e) => setDocName(e.target.value)}    
                    />
                    <Box
                        sx={{
                            width: '100%',
                            textAlign:'right',
                        }}
                        marginTop={3}
                    >
                        <Button variant='contained' sx={{textTransform: 'capitalize'}} onClick={updateDocName} >Edit</Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    )

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            ></ToastContainer>
            {documents.statusCode==200?(
                <div>
                    {currentDoc?(
                        <div>
                            <Box
                                sx={{
                                    backgroundColor: theme.palette.primary.light,
                                    padding: '36px 0 50px 0',
                                }}
                            >
                                <Container>
                                    {editDocNameModal}
                                    <Box
                                        display={'flex'}
                                        justifyContent={'space-between'}
                                        width={'90%'}
                                        margin={'0 auto'}
                                    >
                                        <Typography variant="h4" component={'h2'} margin={0}>{currentDoc.project.name}</Typography>
                                        <Box
                                            sx={{
                                                // backgroundColor: 'green'
                                            }}
                                        >
                                            <Box>
                                                <Box
                                                    display={'flex'}
                                                    alignItems={'center'}
                                                    justifyContent={'flex-end'}
                                                >
                                                    <Typography variant={'body1'} component={'p'} marginRight={1}>
                                                        <i>Owned By </i>
                                                    </Typography>
                                                    <Box
                                                        position={'relative'}
                                                        width={'30px'}
                                                        height={'30px'}
                                                        border={'1px solid white'}
                                                        borderRadius={'50%'}
                                                        overflow={'hidden'}
                                                    >
                                                        <Image src={currentDoc.project.owner.image} alt="Profile Photo" layout="fill" />
                                                    </Box>
                                                </Box>
                                                <Box
                                                    display={'flex'}
                                                    alignItems={'center'}
                                                    justifyContent={'flex-end'}
                                                    marginTop={1}
                                                >
                                                    <Typography variant={'body1'} component={'p'} marginRight={1}>
                                                        <i>Shared With </i>
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                        
                                    </Box>
                                </Container>
                                
                            </Box>
                            <Box
                                sx={{
                                    marginTop: '-20px'
                                }}
                            >
                                <Container>
                                    <TextEditor doc={currentDoc} openNameModal={openModal} />
                                    {/* <Paper
                                        sx={{
                                            width: '95%',
                                            margin: '0 auto',
                                            borderRadius: '0'
                                        }}
                                    >
                                        
                                    </Paper> */}
                                </Container>
                            </Box>

                        </div>
                    ):(
                        <Loading />
                    )}
                </div>
            ):(
                <ErrorBox code={documents.statusCode} msg={documents.error.error} />
            )}
        </div>
    )
}

export default Document

export async function getServerSideProps(context){
    const options = { 
        headers:{ 
            cookie: context.req.headers.cookie 
        },
        method: 'GET'
    };
    const projectID = context.params.proId
    const documentResponse = await fetch(`${server}/api/projects/${projectID}/docs`, options);
    const documents = await documentResponse.json()
    console.log({Documents: documents})

    return {
        props: {
            documents
        }
    }
    
}