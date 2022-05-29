import React, { useCallback, useEffect } from 'react'
import {Box, IconButton, Paper, Typography} from '@mui/material'
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useQuill } from 'react-quilljs';
import { io } from "socket.io-client";
// import ReactQuill from 'react-quill';
import {MdSaveAlt} from 'react-icons/md'
import { server } from "../util/server";
import moment from 'moment'
import {
    Menu,
    MenuItem,
    MenuButton
} from '@szhsin/react-menu';
import {BiDotsVertical} from 'react-icons/bi'
import {MdEdit, MdOutlineFileDownload, MdOutlineDelete} from 'react-icons/md'
// import { pdfExporter } from 'quill-to-pdf';
import { saveAs } from 'file-saver';

// const QuillNoSSRWrapper = dynamic(import('react-quill'), {
//     ssr: false,
//     loading: () => <p>Loading ...</p>,
// })
  

const quillTheme = 'snow'

function TextEditor(props) {
    const {doc, openNameModal} = props
    const [saveError, setSaveError] = useState(null)
    const [saveDate, setSaveDate] = useState(doc.updatedAt) 
    // const [socket, setSocket] = useState()
    const SAVE_INTERVAL_MS = 2000
    let socket
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            [{ align: [] }],
            ["blockquote", "code-block"],
            ["clean"],
          ],
          clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
          },
    };
    const placeholder = 'Compose an epic...';
    const theme = 'snow'
    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
    ];

    const { quill, quillRef } = useQuill({ 
        theme, modules, formats, placeholder, 
    });
    useEffect(() => {
        if(quill){
            quill.setContents(doc.data==null?'':doc.data)
            quill.on('text-change', (delta, oldDelta, source) => {
                console.log('Text change!');
                // console.log(quill.getText()); // Get text only
                // console.log(quill.getContents()); // Get delta contents
                // updateData(quill.getContents)
                
            });
        }
    }, [quill, doc])

    

    // useEffect(() => {
    //     socketInitializer()
    //     return () => {
    //         console.log('Socket Initialized')
    //     }
    // }, [])

    // const socketInitializer = async () => {
    //     await fetch('/api/socketio')
    //     socket = io()
    //     // await setSocket(s)

    //     socket.on('connect', () => {
    //         console.log('connected')
    //         console.log('Emiting Document Connection --- -- -')
    //         socket.emit('create-document-connection', doc._id);
    //     })

    //     // return () => {
    //     //     socket.disconnect()
    //     // }
    // }

    // useEffect(() => {
        
    //     const interval = setInterval(() => {
    //         console.log('Trying to save --- ')
    //         if(socket){
    //             console.log('Saving Document through Socket ... ')
    //             socket.emit("save-document", quill.getContents());
    //         }
    //     }, 10000);
    //     return () => {
    //         clearInterval(interval);
    //     };
    // }, [socket, quill, doc]);
    
    // useEffect(() => {
    //     console.log('Trying to Recienve Changes ---')
    //     if(socket){
    //         console.log('Receiving Changes ...')
    //         socket.on('receive-changes', (data) => {
    //             // quill.setContents(data)
    //             console.log({'Change Data': data})
    //         })
    //         return () => {
    //             socket.off("receive-changes", (data) => {
    //                 // quill.setContents(data)
    //                 console.log({'Change Data': data})
    //             });
    //         };
    //     }
    // }, [socket, quill])

    // useEffect(() => {
    //     const handler = (delta, oldDelta, source) => {
            
    //         socket.emit("send-changes", delta);
    //     };
    //     if(quill){
    //         quill.on("text-change", handler);
    //         return () => {
    //             quill.off("text-change", handler);
    //         };
    //     }
        
    // }, [socket, quill])

    useEffect(() => {
        const interval = setInterval(() => {
            if(quill){
                updateDocument()
            }
        }, 10000);
        
        return () => clearInterval(interval);
    }, [quill, updateDocument])

    const updateDocument = useCallback(async() => {
        console.log('Inside Update Function')
        if(quill){
            console.log(quill==undefined)
            console.log({Content: quill.getContents()})
            fetch(`/api/docs/${doc._id}/edit`, {
                body:JSON.stringify({
                    data: quill.getContents(),
                    updatedAt: new Date()
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
                    setSaveError(null)
                    setSaveDate(data.document.updatedAt)
                } else {
                    console.log({Error: data})
                    setSaveError('Saving Failed ... ')
                    
                }
            })
        }
    }, [quill,doc])

    
    const downloadDocument = async () => {
        // const delta = quill.getContents()
        // const pdfasBlob = await pdfExporter.generatePdf(delta);
        // saveAs(pdfasBlob, `${doc.name}.pdf`)
    }
    
    return (
        <div>
            <Box
                width='100%'
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                sx={{
                    backgroundColor: 'white'
                }}
            >
                <Box display='flex' alignItems={'flex-end'} marginLeft={1}>
                    <Typography variant="h5" component={'h2'}>{doc.name}</Typography>
                    {saveError?
                    <Typography variant="body2" component={'p'} color={'error'} marginLeft={1}>{saveError}</Typography>:
                    <Typography variant="body2" component={'p'} marginLeft={1}>Saved at {moment(saveDate).format('lll')}</Typography>}
                </Box>
                <Box marginRight={1}>
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
                    <MenuItem onClick={openNameModal}> <MdEdit style={{marginRight: '10px'}} />Edit</MenuItem>
                    <MenuItem onClick={downloadDocument}><MdOutlineFileDownload style={{marginRight: '10px'}} />Download</MenuItem>
                    <MenuItem><MdOutlineDelete style={{marginRight: '10px'}} />Delete</MenuItem>
                </Menu>
                </Box>
            </Box>
            <Paper
                sx={{
                    width: '95%',
                    margin: '0 auto',
                    borderRadius: '0',
                    backgroundColor:'white'
                }}
            >
                <Box
                    width={'100%'}
                    ref={quillRef}
                >
                    
                    
                </Box>
            </Paper>
        </div>
    )
}

export default TextEditor