"use server";

import { RegisterUser } from "../services/profile/register";
import bcrypt from "bcrypt";

export const register = async (prevState, formData) => {

    const errors = {};

    const user = {
        username: formData.get("username").trim(),
        password: formData.get("password").trim(),
    }

    if(typeof user.username != "string") user.username = "";
    if(typeof user.password != "string") user.password = "";

    if(user.username.length <  3 ) errors.username = "Username must be at least 3 characters";
    if(user.username.length >= 30) errors.username = "Username cannot exceed 30 characters";
    if(user.username == "") errors.username = "Must provide a username";
    
    if(user.password.length <  10 ) errors.password = "Password must be at least 10 characters";
    if(user.password.length >= 50) errors.password = "Password cannot exceed 50 characters";
    if(user.password == "") errors.password = "Must provide a password";


    if(errors.username || errors.password) {
        return { errors, success: false };
    }
    
    // store a new user in the database
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
    await RegisterUser(user);
    
    // log the user by giving them a token
    return { success: true };
};