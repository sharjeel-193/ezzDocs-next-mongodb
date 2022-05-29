import Project from '../../../models/Project'
import User from '../../../models/User'
import dbConnect from "../../../util/dbConnect";
import { getSession, useSession } from "next-auth/react";

const listSharedProjects = async (req, res) => {
    

    await dbConnect();

    // if (!user) {
    //     return res.json({ error: "Not logged in" });
    // }
    if (req.method === "GET") {

        try {
            const session = await getSession({req});
            const user = session.user
            const response = await Project
                .find({collaborators: {
                    $all: [user._id]
                } })
                .populate({
                    path: 'owner',
                    model: User
                })
            res.status(200).json({
                projects: response, 
                message: 'Projects Fetched Created',
                statusCode: 200
            })
        } catch (error) {
            res.status(500).json({
                statusCode: 500,
                // error: 'We Encountered Some Error, Please Try Again Later ...'
                error: error.message
            })
            
        }
    }
}

export default listSharedProjects