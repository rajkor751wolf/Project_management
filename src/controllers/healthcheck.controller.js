import { APIresponse } from "../utils/api-response.js";
import { Apierror } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";

/*

This is the one way of writing the healthcheck controller.
but why to write the catch block in every controller when we can write a generic 
async handler which will handle the error and pass it to the next middleware.

const healthCheck = async (req, res,next) => { 
    try {
        const user= await getUserfromDB(); 
        res
            .status(200)
            .json(new APIresponse( 200, null, "Server is healthy"));
    } catch (error) {
        next(error);
    }
};
*/
const healthCheck = asyncHandler(async(req, res) => {
    
    res
        .status(200)
        .json(new APIresponse(200, null, "Server is healthy"));
});

export { healthCheck };