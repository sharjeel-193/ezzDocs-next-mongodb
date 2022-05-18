import { getSession, useSession } from "next-auth/react";
import Project from "../../../../../models/Project";
import dbConnect from "../../../../../util/dbConnect";

const removeCollaborator = async(req, res) => {
    const session = await getSession({req});
    const user = session.user
    const projectID = req.query.projectId

    console.log({Request: req.body})

    await dbConnect();

    if(req.method === 'PUT'){
        console.log({Request: req.body})
        try {
            const response = await Project.findByIdAndUpdate(
                projectID,
                {
                    $pull:{
                        collaborators: req.body.collaborator
                    }
                },
                {
                    new: true
                }
            
            )
            console.log({Response: response})
            res.status(200).json({
                statusCode: 200,
                document: response,
                message: 'Collaborator Removed Successfully'
            })
        } catch (error) {
            console.log({'Error': error.message})
            res.status(500).json({
                statusCode: '500',
                error: error.message
            })
        }
    }
}

export default removeCollaborator