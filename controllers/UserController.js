import * as z from "zod";
import { formatError } from "../helpers/Util.js";
import { createUser as createUserService } from "../services/userService.js";

const UserValidationOnCreate = z.object({ 
    name: z.string(),
    email: z.email(),
    password: z.string()
});
UserValidationOnCreate.required({});


export async function listUser(req, res) {
    res.json({
        status: true,
        message: 'sdf'
    });
}


export async function createUser(req, res) {
    try {
        UserValidationOnCreate.parse(req.body);
        await createUserService(req.body);
        res.json({
            status: true,
            message: 'user created successfully'
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