import dbConnect from "../../../util/dbConnect";
import User from '../../../models/User'

const searchUsers = async(req, res) => {
    await dbConnect();
    if(req.method === 'GET'){
        try {
            const response = await User
                .aggregate([
                    {
                        $search:{
                            index: 'searchUser',
                            autocomplete: {
                                query: req.query.name,
                                path: 'name',
                                fuzzy: {
                                    maxEdits: 1,
                                },
                                tokenOrder: "sequential"
                            }
                        }
                    },
                    {
                        $limit: 10
                    }
                ])
                ;
            res.status(200).json({
                statusCode: 200,
                users: response,
                message: 'Users Fetched Successfully'
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

export default searchUsers