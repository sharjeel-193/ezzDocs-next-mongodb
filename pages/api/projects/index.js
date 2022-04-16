import mongoose from "mongoose";
import { getSession, useSession } from "next-auth/react";
import Project from '../../../models/Project'
import User from '../../../models/User'
import dbConnect from "../../../util/dbConnect";

const listProjects =  async (req, res) => {

    const session = await getSession({req});
    const user = session.user

    await dbConnect();

    if (!user) {
        return res.json({ error: "Not logged in" });
    }

    if (req.method === "GET") {
        const project = new Project({
            name: req.body.name,
            owner: user,
            private: true,
            createdAt: new Date(),
            collaborators: []
        });

        try {
            const response = await Project
                .find({owner: user._id})
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
                error: error
            })
            
        }
    }
};

export default listProjects