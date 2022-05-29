import { getSession } from "next-auth/react"
import dbConnect from "../../../../util/dbConnect";
import Project from  '../../../../models/Project'

const deleteProject =async (req, res) => {

    const session = await getSession({req})
    const user = session.user
    const projectID = req.query.projectId

    await dbConnect();

    if(req.method === 'DELETE'){
        try {
            const response = await Project.findByIdAndUpdate(
                projectID,
                {
                    active: false
                },
                {
                    new: true
                }
            )
            console.log({Response: response})
            res.status(200).json({
                statusCode: 200,
                project: response,
                message: 'Project Deleted Successfully'
            })
        } catch (error) {
            res.status(500).json({
                statusCode: '500',
                error: error.message
            })
        }
    }

}

export default deleteProject