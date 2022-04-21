import { Box, Container, useTheme, Typography, Paper } from '@mui/material'
import { useRouter } from 'next/router'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ErrorBox from '../../../../components/ErrorBox'
import Loading from '../../../../components/Loading'
import { server } from '../../../../util/server'
import TextEditor from '../../../../components/TextEditor'

function Document(props) {
    const {documents} = props
    const [currentDoc, setCurrentDoc] = useState(null)
    const theme = useTheme()
    const router = useRouter()
    const { docId } = router.query
    const updateEditorData = (content) => {
        setEditorData(content)
    }
    useEffect(() => {
        if(documents.documents){
            setCurrentDoc(documents.documents.filter(doc => doc._id == docId)[0])
            console.log({Current: currentDoc})
        }
    }, [documents, docId, currentDoc])
    return (
        <div>
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
                                    <TextEditor doc={currentDoc} />
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