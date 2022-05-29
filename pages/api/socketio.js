import { Server } from 'socket.io'
import Document from '../../models/Document'

const ioHandler = async (req, res) => {
    if (res.socket.server.io) {
        console.log('Socket is already running')
    } else {
        console.log('Socket is initializing')
        const io = new Server(res.socket.server)
        res.socket.server.io = io

        io.on('connection', socket => {
            
            socket.on('create-document-connection', docID => {
                socket.join(docID)
                console.log({'Document Socket': socket.data})
                socket.on("save-document", async(data) => {
                    console.log({Id: docID})
                    console.log({Data: data})
                    await saveDocument(docID, data)
                    
                    socket.on("send-changes", (delta) => {
                        socket.broadcast.to(docID).emit("receive-changes", delta);
                    });
                })
            })
            
            
        })
    }
    res.end()
}

const saveDocument = async (docId, data) => {
    console.log('Inside Save Docment')
    try {
        const response  = await Document.findByIdAndUpdate(
            docId,
            {
                data: data
            },
            {
                new: true
            }
        )
        console.log({'Response in Save Socket': response})
        return response
    } catch (error) {
        console.log({'Error in Save Socket': error.message})
    }
}

export const config = {
    api: {
        bodyParser: false
    }
}

export default ioHandler