import { Box, Typography, useTheme, Container, Button, Tab, Modal, Backdrop, Fade, Input, TextField} from '@mui/material'
import {MdAdd} from 'react-icons/md'
import { useState } from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { getSession } from "next-auth/react"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import MyProjects from '../components/MyProjects'
import { server } from '../util/server'


export default function Home(props) {
    const {session, myProjects} = props
    const theme = useTheme()
    const [tabValue, setTabValue] = useState('1')
    const [showModal, setShowModal] = useState(false)
    const [projectNameInput, setProjectNameInput] = useState('')
    const MySwal = withReactContent(Swal)
    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };
    const openModal = () => {
        setShowModal(true)
    }
    const closeModal = () => {
        setShowModal(false)
    }
    const createProject = async () => {
        console.log('Inside Create Function')
        fetch('/api/projects/add', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: projectNameInput,
            })
        })
        .then((res) => res.json())
        .then((data) => {
            
            if(data.statusCode == 201){
                console.log({Data: data})
                closeModal()
                createAlert('success', data.message)
            } else {
                console.log({Error: data})
                closeModal()
                createAlert('error', data.error)
                
            }
        })
        
    }
    const createAlert = (type, message) => {
        MySwal.fire({
            title: '',
            text: message,
            icon: type=='error'?'error':'success',
            confirmButtonText: 'Ok'
        })
        
    }
    const createProjectModal = (
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
                        fullWidth 
                        label='Project Name'
                        onChange={(e) => setProjectNameInput(e.target.value)}    
                    />
                    <Box
                        sx={{
                            width: '100%',
                            textAlign:'right',
                        }}
                        marginTop={3}
                    >
                        <Button variant='contained' sx={{textTransform: 'capitalize'}} onClick={createProject}>Create</Button>
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
                {createProjectModal}
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
                            Welcome, {session?.user?._id}
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
                            Create a New Project
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
                                <Tab label={<Typography textTransform={'capitalize'}>My Projects</Typography>} value='1' />
                                <Tab label={<Typography textTransform={'capitalize'}>Shared with Me</Typography>} value='2' />
                            </TabList>
                        </Box>
                        <TabPanel value='1'>
                            {myProjects.projects &&
                            <MyProjects projects={myProjects.projects} />}
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

export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }
    const options = { 
        headers:{ 
            cookie: context.req.headers.cookie 
        },
        method: 'GET'
    };
    const myProjectRes = await fetch(`${server}/api/projects`, options)
    const myProjects = await myProjectRes.json()
    console.log({Projects: myProjects})
    return {
        props: { 
            session,
            myProjects: myProjects
        }
    }
}
