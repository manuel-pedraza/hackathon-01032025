"use server";

import { cookies } from "next/headers";
import { RegisterUser, CheckForUser } from "../services/profile";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";


export const logOut = async () => {
    const cookiesStore = await cookies();
    cookiesStore.delete("recipioapp");
    redirect("/");
};

export const logIn = async (prevState, formData) => {

    const failedObject = { success: false, message: "Invalid username or password" };

    const user = {
        username: formData.get("username").trim(),
        password: formData.get("password").trim(),
    }

    if (typeof user.username != "string") user.username = "";
    if (typeof user.password != "string") user.password = "";

    const dbUser = await CheckForUser({ username: user.username });

    if (!dbUser)
        return failedObject;

    const matchOrNot = bcrypt.compareSync(user.password, dbUser.password);

    if (!matchOrNot)
        return failedObject;

    const tokenValue = jwt.sign(
        { userId: dbUser._id.toString(), exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 },
        process.env.JWT_SECRET
    );

    const cookiesStore = await cookies();

    cookiesStore.set("recipioapp", tokenValue, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
        secure: true
    });

    return redirect("/");
}

export const register = async (prevState, formData) => {

    const errors = {};

    const user = {
        username: formData.get("username").trim(),
        password: formData.get("password").trim(),
    }

    if (typeof user.username != "string") user.username = "";
    if (typeof user.password != "string") user.password = "";

    if (user.username.length < 3) errors.username = "Username must be at least 3 characters";
    if (user.username.length >= 30) errors.username = "Username cannot exceed 30 characters";
    if (user.username == "") errors.username = "Must provide a username";

    const dbUser = await CheckForUser({ username: user.username });
    if (dbUser) errors.username = "Username already exists";

    if (user.password.length < 10) errors.password = "Password must be at least 10 characters";
    if (user.password.length >= 50) errors.password = "Password cannot exceed 50 characters";
    if (user.password == "") errors.password = "Must provide a password";

    if (errors.username || errors.password) {
        return { errors, success: false };
    }

    // store a new user in the database
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
    const newUser = await RegisterUser(user);
    const userId = newUser.insertedId.toString();

    // Create our jwt token
    const tokenValue = jwt.sign(
        { userId, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 },
        process.env.JWT_SECRET
    );

    const cookiesStore = await cookies();

    cookiesStore.set("recipioapp", tokenValue, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
        secure: true
    });

    // log the user by giving them a token
    return { success: true };
};