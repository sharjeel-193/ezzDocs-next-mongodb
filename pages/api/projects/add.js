import { getSession, useSession } from "next-auth/react";
import Project from '../../../models/Project'
import dbConnect from "../../../util/dbConnect";

const addProject =  async (req, res) => {

    const session = await getSession({req});
    const user = session.user
    // console.log(user)

    await dbConnect();

    if (!user) {
        return res.json({ error: "Not logged in" });
    }

    if (req.method === "POST") {
        const project = new Project({
            name: req.body.name,
            owner: user._id,
            private: true,
            createdAt: new Date(),
            collaborators: []
        });

        try {
            const response = await project.save()
            res.status(201).json({
                project: response, 
                message: 'Project Successfully Created',
                statusCode: 201
            })
        } catch (error) {
            if (error.name == 'ValidationError'){
                res.status(406).json({
                    statusCode: 406,
                    error: error.message
                })
            } else {
                res.status(500).json({
                    statusCode: 500,
                    error: 'We Encountered Some Error, Please Try Again Later ...'
                })
            }
            
        }
    }
};

export default addProject