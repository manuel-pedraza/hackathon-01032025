import getClient from "../lib/mongodb/mongodb";

export async function RegisterUser(user) {

    // We've done the validations before at this point
    const mongoClient = await getClient();
    const db = await mongoClient.db();
    const users = await db.collection("Users");
    return await users.insertOne(user);

}

export async function CheckForUser(username) {

    const mongoClient = await getClient();
    const db = await mongoClient.db();
    const users = await db.collection("Users");
    return await users.findOne(username); 

}