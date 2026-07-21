import { APIresponse } from "../utils/api-response.js";
import { Apierror } from "../utils/api-error.js";


const healthCheck = (req, res) => { 
    try {
        res
            .status(200)
            .json(new APIresponse( 200, null, "Server is healthy"));
    } catch (error) {
        res
            .status(500)
            .json(new Apierror(500, "Server is not healthy"));
    }
};

export {healthCheck};