import { Box, Typography, useTheme, Container, Button, Tab, Modal, Backdrop, Fade, Input, TextField} from '@mui/material'
import {MdAdd} from 'react-icons/md'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { useSession, getProviders, getSession } from "next-auth/react"
import Login from '../components/Login'


export default function Home() {
    const theme = useTheme()
    const {data: session} = useSession()
    const [tabValue, setTabValue] = useState('1')
    const [showModal, setShowModal] = useState(false)
    const [docNameInput, setDocNameInput] = useState('')
    // console.log(({providers}))
    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };
    const openModal = () => {
        setShowModal(true)
    }
    const closeModal = () => {
        setShowModal(false)
    }
    if(!session){
        return (
            <Login />
        )
    }
    const createDoc = async () => {
        console.log('Inside Create Function')
        try {
            const res = await fetch('/api/doc', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: docNameInput
                })
            })
            // const res = await fetch('/api/doc', {
            //     method: 'GET',
            //     headers: {
            //         "Content-Type": "application/json",
            //       },
            // })
            console.log(res)
            // router.push("/");
        } catch (error) {
            console.log(error);
        }
    }
    const createDocModal = (
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
                        <Button variant='contained' sx={{textTransform: 'capitalize'}} onClick={createDoc}>Create</Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    )
    return (
        <div>
            <Box
                sx={{
                    backgroundColor: theme.palette.primary.light,
                    padding: '36px 0',
                }}
            >
                {createDocModal}
                <Container>
                    <Box>
                        <Typography 
                            variant='h3' 
                            component={'h1'} 
                            letterSpacing={-2}
                            color={theme.palette.primary.main}
                            sx={{
                                transition: 'all 0.2s linear'
                            }}
                        >
                            Welcome,
                        </Typography>
                        <Typography variant='h3' color={theme.palette.secondary.light} marginLeft={2}>
                            {session?.user?.name || 'M. Sharjeel Maqsood'}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            marginTop: '20px',
                            textAlign:'center'
                        }}
                    >
                        <Button variant='outlined' color='primary' startIcon={<MdAdd />}
                            sx={{
                                '&:hover':{
                                    backgroundColor: theme.palette.primary.main,
                                    color: theme.palette.secondary.light
                                }
                            }}
                            onClick={openModal}
                        >
                            Create a New Document
                        </Button>
                    </Box>
                </Container>  

            </Box>
            <Box
                sx={{
                    padding: '24px 0'
                }}
            >
                <Container>
                <Box sx={{ width: '100%'}}>
                    <TabContext value={tabValue}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', textTransform: 'capitalize' }}>
                            <TabList onChange={handleChange}>
                                <Tab label={<Typography textTransform={'capitalize'}>My Documents</Typography>} value='1' />
                                <Tab label={<Typography textTransform={'capitalize'}>Shared with Me</Typography>} value='2' />
                            </TabList>
                        </Box>
                        <TabPanel value='1'>
                            <Typography variant='h1'>TAB 1</Typography>
                        </TabPanel>
                        <TabPanel value='2'>
                            <Typography variant='h1'>TAB 2</Typography>
                        </TabPanel>
                    </TabContext>
                </Box>
                </Container>
            </Box>
        </div>
    )
}

// Home.getInitialProps = async (context) => {
//     return {
//         providers: await getProviders(context),
//         // session: await getSession(context)
//     }
//   }
