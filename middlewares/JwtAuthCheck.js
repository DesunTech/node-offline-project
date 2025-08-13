import User from "../models/User.js";
import jwt from 'jsonwebtoken';

export async function JwtAuthCheck(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Unauthorized: No token provided' });
    }

    const token  = authHeader.split('Bearer ')[1];
    try {
        const jwtDocoaded = jwt.decode(token, process.env.JWT_SECRET);
        const userData = jwtDocoaded.data;

        const authUser = await User.findOne({email: userData.email});
        authUser.actions = userData.actions;

        req.user = authUser;
        next();
    } catch(e) {
        return res.status(403).json({ message: 'Invalid token' });
    }
}