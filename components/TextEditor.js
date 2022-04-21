import React, { useEffect } from 'react'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import {Box, IconButton, Paper, Typography} from '@mui/material'
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useQuill } from 'react-quilljs';
// import ReactQuill from 'react-quill';
import {MdSaveAlt} from 'react-icons/md'

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})
  

const quillTheme = 'snow'

function TextEditor(props) {
    const {doc} = props
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
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
            } else {
                console.log({Error: data})
                
            }
        })
    }
    
    return (
        <div>
            <Box>
                <Typography variant="h5" component={'h2'}>{doc.name}</Typography>
                <IconButton onClick={updateDocument}>
                    <MdSaveAlt />
                </IconButton>
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