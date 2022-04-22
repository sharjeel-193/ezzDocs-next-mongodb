import React, { useEffect } from 'react'
import {Box, IconButton, Paper, Typography} from '@mui/material'
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useQuill } from 'react-quilljs';
// import ReactQuill from 'react-quill';
import {MdSaveAlt} from 'react-icons/md'

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

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})
  

const quillTheme = 'snow'

function TextEditor(props) {
    const {doc, openNameModal} = props
    const [saveError, setSaveError] = useState(null)
    const [saveDate, setSaveDate] = useState(doc.updatedAt) 
    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
              { list: 'ordered' },
              { list: 'bullet' },
              { indent: '-1' },
              { indent: '+1' },
            ],
            ['link', 'image', 'video'],
            ['clean'],
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
            quill.setContents(doc.data)
            quill.on('text-change', (delta, oldDelta, source) => {
                console.log('Text change!');
                // console.log(quill.getText()); // Get text only
                // console.log(quill.getContents()); // Get delta contents
                // updateData(quill.getContents)
                
            });
        }
    }, [quill, doc])

    useEffect(() => {
        
        const interval = setInterval(() => {
            if(quill){
                updateDocument()
            }
        }, 10000);
        
        return () => clearInterval(interval);
    }, [])

    setInterval(updateDocument, 5000)

    const updateDocument = () => {
        console.log('Inside Update Function')
        console.log({Data: quill.getContents()})
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