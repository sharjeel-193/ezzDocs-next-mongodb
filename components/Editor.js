import React, { useState, useCallback, useEffect } from "react";
import Quill from "quill";
import { io } from "socket.io-client";
import {Box, IconButton, Paper, Typography} from '@mui/material'
import moment from 'moment'
import {
    Menu,
    MenuItem,
    MenuButton
} from '@szhsin/react-menu';
import {BiDotsVertical} from 'react-icons/bi'
import {MdEdit, MdOutlineFileDownload, MdOutlineDelete} from 'react-icons/md'
import { server } from "../util/server";

const SAVE_INTERVAL_MS = 10000;
const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
];

function Editor(props) {
    const {doc, openNameModal} = props
    const [saveError, setSaveError] = useState(null)
    const [saveDate, setSaveDate] = useState(doc.updatedAt) 
    const [quill, setQuill] = useState();
    const [socket, setSocket] = useState();

    // useEffect(() => {
    //     const s = io(server);
    //     setSocket(s);
    //     return () => {
    //       s.disconnect();
    //     };
    // }, []);

    useEffect(() => {
        fetch('/api/socketio').finally(() => {
            setSocket(io())

        })
    }, [])

    const wrapperRef = useCallback((wrapper) => {
        if (wrapper == null) return;
            wrapper.innerHTML = "";
            // const editor = document.createElement("div");
            wrapper.append(editor);
            const q = new Quill(editor, {
                theme: "snow",
                modules: { toolbar: TOOLBAR_OPTIONS },
            }
        );
        q.disable();
        q.setText("Loading...");
        setQuill(q);
    }, [])
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
                    <MenuItem ><MdOutlineFileDownload style={{marginRight: '10px'}} />Download</MenuItem>
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
                    ref={wrapperRef}
                >
                    
                    
                </Box>
            </Paper>
        </div>
    )
}

export default Editor