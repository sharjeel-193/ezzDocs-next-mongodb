import { Box, Button, Container, Grid, IconButton, TextField, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { server } from "../../../util/server";
import {MdEdit} from 'react-icons/md'
import Image from 'next/image';
import {BiDotsVertical} from 'react-icons/bi'
import {
    Menu,
    MenuItem,
    MenuButton
} from '@szhsin/react-menu';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


function Settings(props) {
    const theme = useTheme()
    const router = useRouter()
    const [editMode, setEditMode] = useState(false)
    const {project} = props
    const [proName, setProName] = useState('')
    const { proId } = router.query
    const MySwal = withReactContent(Swal)
    useEffect(() => {
        console.log({'PRoject Settings Props': props})
        if(project.statusCode == 200){
            setProName(project.project.name)
        }
    }, [props, project])
    const openEditMode = () => {
        setEditMode(true)
    }
    const closeEditMode = () => {
        setProName(project.project.name)
        setEditMode(false)
    }
    const editProjectName = () => {
        fetch(`/api/projects/${proId}/edit`, {
            body:JSON.stringify({
                name: proName
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
                router.replace(router.asPath)
                setEditMode(false)
                createAlert('success', data.message)
            } else {
                console.log({Error: data})
                createAlert('error', data.error)
            }
        })
    }
    const removeCollaborator = (colabId) => {
        console.log({'Inside Remove': colabId})
        fetch(`/api/projects/${proId}/collaborators/remove`, {
            method: 'PUT',
            body:JSON.stringify({
                collaborator: colabId
            }),
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(res => res.json())
        .then((data) => {
            console.log({'Response': data})
            if(data.statusCode==200){
                createAlert('success', data.message)
                router.replace(router.asPath)
                
            } else {
                createAlert('error', data.error)
            }
        })
    }
    const deleteProject = () => {
        fetch(`/api/projects/${proId}/delete`, {
            
            headers: {
                "Content-Type": "application/json",
            },
            method: "DELETE",
        })
        .then(res => res.json())
        .then((data) => {
            console.log({'Response': data})
            if(data.statusCode==200){
                createAlert('success', data.message)
                router.replace('/')
                
            } else {
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
    const confirmDeletion = () => {
        MySwal.fire({
            title: 'Confirm',
            text: 'Are you sure, you want to delete this project?',
            icon: 'warning',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            showCancelButton: true,
            confirmButtonColor: 'red'
        }).then((result) => {
            console.log(result)
            if(result.isConfirmed){
                deleteProject()
            }
        })
    }
    return (
        <div>
            <Box
                sx={{
                    backgroundColor: theme.palette.primary.light,
                    padding: '36px 0 50px 0',
                }}
            >
                <Container>
                    <Box 
                        display={'flex'}
                        justifyContent={'space-between'}
                        width={'100%'}
                        margin={'0 auto'}
                    >
                        <Typography variant="h4" component={'h2'} margin={0}>Project Settings</Typography>
                    </Box>
                </Container>
            </Box>
            <Box my={5}>
                <Container>
                    <Grid container spacing={2} alignItems={'center'} borderBottom={`1px solid #f8f8f8`} paddingBottom={2}>
                        <Grid item sm={12} md={1} lg={1}>
                            <Typography variant={'h6'} component={'h3'}>Name</Typography>
                        </Grid>
                        <Grid item sm={12} md={9} lg={10}>
                            {editMode?(
                                <Box
                                    display={'flex'}
                                    justifyContent={'space-between'}
                                    flexWrap={'wrap'}
                                    alignItems={'center'}
                                >
                                    <TextField 
                                        sx={{minWidth:'500px'}} 
                                        variant='outlined' 
                                        value={proName} 
                                        onChange={(e) => setProName(e.target.value) }
                                    >

                                    </TextField>
                                    <Box>
                                        <Button variant='outlined'
                                            sx={{
                                                textTransform: 'capitalize',
                                                marginRight: '10px'
                                            }}
                                            onClick={closeEditMode}
                                        >
                                            Cancel
                                        </Button>
                                        <Button 
                                            sx={{
                                                backgroundColor: theme.palette.primary.light,
                                                color: 'white',
                                                textTransform: 'capitalize',
                                                '&:hover':{
                                                    backgroundColor: theme.palette.primary.dark
                                                }
                                            }}
                                            onClick={editProjectName}
                                        >
                                            Change
                                        </Button>
                                    </Box>
                                </Box>
                            ):(
                                <Box
                                    display={'flex'}
                                    justifyContent={'space-between'}
                                    flexWrap={'wrap'}
                                    alignItems={'center'}
                                >
                                    <Typography variant={'body1'} component={'p'}margin={0}>{project.project.name}</Typography>
                                    <IconButton margin={0} onClick={openEditMode}>
                                        <MdEdit />
                                    </IconButton>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                    <Box marginTop={3}>
                        <Typography variant={'h6'} component={'h3'}>Collaborators</Typography>
                        <Box marginTop={2}>
                            {project.project.collaborators.map((item, index) => (
                                <Box 
                                    width={'90%'}
                                    margin={'0 auto'}
                                    key={`colab-${index}`}
                                    display={'flex'}
                                    alignItems={'center'}
                                    justifyContent={'space-between'}
                                    borderBottom={`1px solid #f8f8f8`}
                                    paddingY={1}
                                >
                                    <Box display={'flex'} alignItems='center'>
                                        <Box
                                            marginRight={'20px'}
                                            position={'relative'} 
                                            border={'black'}
                                            sx={{
                                                width:'36px',
                                                height: '36px',
                                                borderRadius:'50%',
                                                overflow: 'hidden'
                                            }}
                                        >
                                            <Image src={item.image} layout={'fill'} alt={''} />
                                        </Box>
                                        <Typography>{item.name}</Typography>
                                    </Box>
                                    <Box>
                                        <Menu
                                            menuButton={
                                                <IconButton>
                                                    <BiDotsVertical />
                                                </IconButton>
                                            }
                                            transition
                                            direction='bottom'
                                            align='end'
                                            position='anchor'
                                            viewScroll='auto'
                                            arrow={true}
                                        >
                                            <MenuItem onClick={() => removeCollaborator(item._id)}>Remove</MenuItem>
                                        </Menu>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Box marginTop={3} textAlign='center'>
                        <Button variant='outlined' color='error' onClick={confirmDeletion}>Delete this project</Button>
                    </Box>
                </Container>
            </Box>
        </div>
    )
}

export default Settings

export async function getServerSideProps(context){
    const options = { 
        headers:{ 
            cookie: context.req.headers.cookie 
        },
        method: 'GET'
    };
    const projectID = context.params.proId
    const projectResponse = await fetch(`${server}/api/projects/${projectID}`, options);
    const project  = await projectResponse.json()
    return {
        props: {
            project
            
        }
    }
}