import mongoose from "mongoose";
import { getSession, useSession } from "next-auth/react";
import Project from '../../../../models/Project'
import User from '../../../../models/User'
import dbConnect from "../../../../util/dbConnect";

const getProject =  async (req, res) => {

    const session = await getSession({req});
    const user = session? session.user: {
        _id: 'a'
    };
    const projectID = req.query.projectId

    await dbConnect();

    // if (!user) {
    //     return res.json({ error: "Not logged in" });
    // }

    if (req.method === "GET") {

        try {
            const response = await Project
                .findOne({_id: projectID})
                .populate({
                    path: 'owner',
                    model: User
                })
            if(response.private && response.owner._id!==user._id){
                res.status(403).json({
                    statusCode: 403,
                    error: 'Sorry, You Cannot access this project it is private'
                })
            }
            res.status(200).json({
                project: response, 
                message: 'Project Fetched Successfully',
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

export default getProject