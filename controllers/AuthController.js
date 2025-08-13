import * as z from "zod";
import { formatError } from "../helpers/Util.js";
import { handleLogin, handleRegister } from "../services/userService.js";

const authSchema = z.object({ 
    email: z.string(),
    password: z.string()
});
authSchema.required({});

const registerchema = z.object({ 
    email: z.string(),
    password: z.string(),
    role: z.string()
});
authSchema.required({});

export async function login(req, res) {
    try {
        authSchema.parse(req.body);
        const token = await handleLogin(req.body);

        res.status(200).json({
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

export async function register(req, res) {
    try {
        registerchema.parse(req.body);
        const token = await handleRegister(req.body);

        res.status(200).json({
            status: true,
            message: "Register successfull"
        });
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