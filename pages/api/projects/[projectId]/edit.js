import { getSession } from "next-auth/react"
import dbConnect from "../../../../util/dbConnect";
import Project from  '../../../../models/Project'

const editProject =async (req, res) => {

    const session = await getSession({req})
    const user = session.user
    const projectID = req.query.projectId

    await dbConnect();

    if(req.method === 'PUT'){
        try {
            const response = await Project.findByIdAndUpdate(
                projectID,
                req.body,
                {
                    new: true
                }
            )
            console.log({Response: response})
            res.status(200).json({
                statusCode: 200,
                project: response,
                message: 'Project Updated Successfully'
            })
        } catch (error) {
            res.status(500).json({
                statusCode: '500',
                error: error.message
            })
        }
    }

}

export default editProject