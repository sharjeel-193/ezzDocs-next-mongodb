import { getSession } from "next-auth/react"
import dbConnect from "../../../../util/dbConnect"
import Document from "../../../../models/Document"

const editDocuments = async (req, res) => {
    const session = await getSession({req});
    const user = session?session.user:false;
    // console.log(user)
    const docID = req.query.docId;

    await dbConnect()

    if(req.method == 'PUT'){
        console.log({'Request Body': req.body})
        try {
            const response  = await Document.findByIdAndUpdate(
                docID,
                req.body,
                
                {
                    new: true
                }
            )
            console.log({Response: response})
            res.status(200).json({
                statusCode: 200,
                document: response,
                message: 'Documents Updated Successfully'
            })
        } catch (error) {
            res.status(500).json({
                statusCode: '500',
                error: error.message
            })
        }
    }
}

export default editDocuments