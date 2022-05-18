import { Box, Container, IconButton, Paper, Typography, useMediaQuery, useTheme, Tooltip,} from "@mui/material"
import moment from "moment"
import { route } from "next/dist/server/router";
import { useSession } from "next-auth/react"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import {MdOutlineAdd, MdSettings} from 'react-icons/md'
import ErrorBox from "../../../components/ErrorBox";
import Loading from "../../../components/Loading";
import { server } from "../../../util/server";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import SearchCollaboratorModal from "../../../components/modals/SearchCollaboratorModal";
import CreateDocumentModal from "../../../components/modals/CreateDocumentModal";

const Project = (props) => {
    const theme = useTheme();
    const router = useRouter()
    const MySwal = withReactContent(Swal)
    const {project, documents} = props
    const {data: session} = useSession()
    const { proId } = router.query
    const reqResp = useMediaQuery(theme.breakpoints.down('md'))
    const [docNameInput, setDocNameInput] = useState('')
    const [docModal, setDocModal] = useState(false)
    const [searchModal, setSearchModal] = useState(false)
    const [searchUser, setSearchUser] = useState('')
    const [searchOptions, setSearchOptions] = useState([])
    
    const openDocModal = () => {
        setDocModal(true)
    }
    const closeDocModal = () => {
        setDocModal(false)
    }
    const openSearchModal = () => {
        setSearchModal(true)
    }
    const closeSearchModal = () => {
        setSearchModal(false)
    }
    const createDocument = async () => {
        console.log('Inside Create Doc Function')
        fetch(`/api/projects/${proId}/add`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: docNameInput,
                project: proId
            })
        })
        .then((res) => res.json())
        .then((data) => {
            
            if(data.statusCode == 201){
                console.log({Data: data})
                closeModal()
                router.replace(router.asPath)
                createAlert('success', data.message)
            } else {
                console.log({Error: data})
                closeModal()
                createAlert('error', data.error)
                
            }
        })
    }
    const getSearchUsers = async (str) => {
        const searchedData = await fetch(
            `/api/users/search?name=${str}`,
            {
                method: 'GET'
            }
        )
        const data = await searchedData.json()
        console.log({Search: data})
        return data
    }
    const onSearchChange= async(e) => {
        if (e.target.value) {
            const data = await getSearchUsers(e.target.value);
            if(data){
                setSearchOptions(data.users);
                console.log('Options RESET')
            }
        }
    }
    const addCollaborators = (selectedColabs) => {
        console.log({"Collaborators to Add": selectedColabs})
        fetch(`/api/projects/${proId}/collaborators/add`, {
            method: 'PUT',
            body:JSON.stringify({
                collaborators: selectedColabs
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
            closeSearchModal()
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
    
    return (
        <div>
            {(project && documents)?(
                <>
                    {project.error?(
                        <ErrorBox code={project.statusCode} msg={project.error} />
                    ):(
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
                                        width={'90%'}
                                        margin={'0 auto'}
                                    >
                                        {project && project.statusCode==200 &&
                                        <Typography variant="h4" component={'h2'} margin={0}>{project.project.name}</Typography>}
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
                                                        <Image src={project.project.owner.image} alt="Profile Photo" layout="fill" />
                                                    </Box>
                                                    <Tooltip title={'Settings'}>
                                                        <Link href={`/project/${project.project._id}/settings`} passHref>
                                                            <IconButton>
                                                                <MdSettings />
                                                            </IconButton>
                                                        </Link>
                                                    </Tooltip>
                                                </Box>
                                                <Box
                                                    display={'flex'}
                                                    alignItems={'center'}
                                                    justifyContent={'flex-end'}
                                                    marginTop={1}
                                                >
                                                    <Typography variant={'body1'} component={'p'} marginRight={2}>
                                                        <i>Shared With </i>
                                                    </Typography>
                                                    <Box display={'flex'} alignItems={'center'}>
                                                        {project.project.collaborators.map((item,index) => (
                                                            <Tooltip key={index} title={item.name}>
                                                                <Box
                                                                    position={'relative'}
                                                                    width={'30px'}
                                                                    height={'30px'}
                                                                    border={'1px solid white'}
                                                                    borderRadius={'50%'}
                                                                    overflow={'hidden'}
                                                                    key={index}
                                                                    marginLeft={-1}
                                                                >
                                                                    <Image src={item.image} alt="Profile Photo" layout="fill" />
                                                                </Box>
                                                            </Tooltip>
                                                        ))}
                                                        <IconButton
                                                            onClick={openSearchModal}
                                                            sx={{
                                                                width: '30px',
                                                                height: '30px',
                                                                marginLeft: -1,
                                                                backgroundColor: 'white',
                                                                '&:hover':{
                                                                    backgroundColor: theme.palette.primary.main,
                                                                    color : 'white'
                                                                }
                                                            }}
                                                        >
                                                            <MdOutlineAdd />
                                                        </IconButton>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Container>
                            </Box>
                            
                            <Box>
                                {/* {createDocumentModal} */}
                                <CreateDocumentModal
                                    docModal={docModal}
                                    closeDocModal={closeDocModal}
                                    setDocNameInput={setDocNameInput}
                                    createDocument={createDocument}
                                />
                                <SearchCollaboratorModal 
                                    searchModal={searchModal} 
                                    closeSearchModal={closeSearchModal} 
                                    setSearchUser={setSearchUser} 
                                    searchOptions={searchOptions}
                                    onSearchChange={onSearchChange}
                                    user={session?.user?._id}
                                    currentColabs={project.project.collaborators}
                                    addCollaborators={addCollaborators}
                                />
                                <Container>
                                    <Box width={'90%'} margin={'0 auto'} display={'flex'} justifyContent={'center'}>
                                        <Paper elevation={3}
                                            
                                            sx={{
                                                marginTop:'-10px',
                                                padding: '16px',
                                                width:'100%'
                                            }}
                                        >
                                            <Box
                                                width={'100%'}
                                                display={'flex'}
                                                justifyContent={'space-between'}
                                                alignItems={'center'}
                                                marginBottom={2}
                                            >
                                                <Typography variant="h5" component={'h3'}>Documents</Typography>
                                                
                                                <IconButton
                                                    sx={{
                                                        border: `1px solid ${theme.palette.primary.main}`,
                                                        padding: '2px',
                                                        color: theme.palette.primary.main,
                                                        '&:hover':{
                                                            backgroundColor: theme.palette.primary.main,
                                                            color: 'white'
                                                        }
                                                    }}
                                                    onClick={openDocModal}
                                                >
                                                    <MdOutlineAdd />
                                                </IconButton>
                                            </Box>
                                            {documents.documents && documents.documents.map((doc, index) => (
                                                <Box 
                                                    key={`doc-${index}`} 
                                                    display={'flex'} 
                                                    flexDirection={reqResp?'column':'row'}
                                                    justifyContent={'space-between'} 
                                                    alignItems={'center'} 
                                                    marginBottom={1} 
                                                    paddingBottom={1} 
                                                    borderBottom={'1px solid black'}
                                                    sx={{transition: 'all 0.2s linear'}}
                                                >
                                                    <Box 
                                                        textAlign={'left'} 
                                                        width={reqResp?'100%':'fit-content'} 
                                                        sx={{transition: 'all 0.2s linear', cursor: 'pointer'}}
                                                        
                                                    >
                                                        <Link href={`/project/${project.project._id}/doc/${doc._id}`} passHref>
                                                            <Typography variant="h6" component={'h3'}>{doc.name}</Typography>
                                                        </Link>
                                                    </Box>
                                                    <br></br>
                                                    <Box 
                                                        textAlign={'right'} 
                                                        width={reqResp?'100%':'fit-content'}
                                                        sx={{transition: 'all 0.2s linear'}}
                                                        display={'flex'}
                                                        justifyContent={'flex-end'}
                                                        alignItems={'center'}
                                                    >
                                                        <Typography variant={'body2'} marginRight={1}>Last Saved at</Typography>
                                                        <Typography variant="body1" component={'p'}>{moment(doc.updatedAt).format('llll')}</Typography>
                                                    </Box>
                                                </Box>
                                            ))}
                                        </Paper>
                                    </Box>
                                </Container>
                            </Box>
                        </div>
                    )}
                </>
            ):
            (
                <Loading />
            )}
        </div>
    )
}

export default Project

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
    if(project.statusCode!=200){
        return {
            props: {
                project,
                documents: {},
                
            }
        }
    }
    const documentResponse = await fetch(`${server}/api/projects/${projectID}/docs`, options);
    const documents = await documentResponse.json()
    console.log({Project: project})
    console.log({Documents: documents})

    return {
        props: {
            project,
            documents
        }
    }
}