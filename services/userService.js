import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { email } from "zod";

export async function createUser(userData) {
    if(!userData.password) {
        throw new Error("Invalid pasword");
    }

    userData.password = await bcrypt.hash(userData.password, 10);
    await User.create(userData);

    return true;
}

export async function handleLogin(userData) {
    const user = await User.findOne({email: userData.email});
    if(!user) {
        throw new Error("No user found with this email");
    }

    const passwordStatus = await bcrypt.compare(userData.password, user.password);
    if(passwordStatus === false) {
        throw new Error("Invalid password");
    }

    const tokenData = {
        email: user.email,
        name: user.name
    }

    const token = jwt.sign({
        data: tokenData
    }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return token;
}