import mongoose from "mongoose";
import { getSession, useSession } from "next-auth/react";
// import Project from '../../../../models/Project'
// import User from '../../../../models/User'
import Document from '../../../../models/Document'
import Project from "../../../../models/Project";
import User from "../../../../models/User";
import dbConnect from "../../../../util/dbConnect";

const listDocuments =  async (req, res) => {

    

    await dbConnect();

    // if (!user) {
    //     return res.json({ error: "Not logged in" });
    // }

    if (req.method === "GET") {

        try {
            const session = await getSession({req});
            const user = session? session.user: '';
            const projectID = req.query.projectId
            const response = await Document
                .find({project: projectID})
                .populate({
                    path: 'project',
                    model: Project,
                    populate: {
                        path: 'owner',
                        model: User
                    }
                })
            res.status(200).json({
                documents: response, 
                message: 'Documents Fetched Successfully',
                statusCode: 200
            })
        } catch (error) {
            res.status(500).json({
                statusCode: 500,
                // error: 'We Encountered Some Error, Please Try Again Later ...'
                error: error
            })
            
        }
    }
};

export default listDocuments