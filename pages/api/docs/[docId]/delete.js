import { getSession } from "next-auth/react"
import dbConnect from "../../../../util/dbConnect"
import Document from "../../../../models/Document"

const deleteDocument = async (req, res) => {
    

    await dbConnect()

    if(req.method == 'DELETE'){
        const session = await getSession({req});
        const user = session.user
        const docID = req.query.docId;
        try {
            const response  = await Document.findByIdAndUpdate(
                docID,
                {
                    active: false
                },
                
                {
                    new: true
                }
            )
            res.status(200).json({
                statusCode: 200,
                document: response,
                message: 'Document Deleted Successfully'
            })
        } catch (error) {
            res.status(500).json({
                statusCode: '500',
                error: error.message
            })
        }
    }
}

export default deleteDocument