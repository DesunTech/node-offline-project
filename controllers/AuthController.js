import * as z from "zod";
import { formatError } from "../helpers/Util.js";
import { handleLogin } from "../services/userService.js";

const authSchema = z.object({ 
    email: z.string(),
    password: z.string()
});
authSchema.required({});

export async function login(req, res) {
     try {
        authSchema.parse(req.body);
        const token = await handleLogin(req.body);

        res.status(500).json({
            status: true,
            message: "Login successfull",
            data: {
                token
            }
        })

    } catch( e ) {
        if(e instanceof z.ZodError){
            res.status(400).json({
                status: false,
                message: "Validation error",
                errors: formatError(e.issues)
            });
            return;
        }

        res.status(500).json({
            status: false,
            message: e.message
        })
    }
}

export async function userOrder(req, res) {

    const user = req.user;

    res.json({
        status: true,
        message: "here is the user order",
        user_data: user
    });
}