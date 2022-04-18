import { getSession, useSession } from "next-auth/react";
import Document from "../../../../models/Document";
import dbConnect from "../../../../util/dbConnect";

const addDocument =  async (req, res) => {

    const session = await getSession({req});
    const user = session.user
    const projectID = req.query.projectId
    // console.log(user)

    await dbConnect();

    if (!user) {
        return res.json({ error: "Not logged in" });
    }

    if (req.method === "POST") {
        const document = new Document({
            name: req.body.name,
            project: projectID,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        try {
            const response = await document.save()
            res.status(201).json({
                document: response, 
                message: 'Document Successfully Created',
                statusCode: 201
            })
        } catch (error) {
            if (error.name == 'ValidationError'){
                res.status(406).json({
                    statusCode: 406,
                    message: error.message
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

export default addDocument