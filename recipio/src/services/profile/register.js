import getClient from "../../lib/mongodb/mongodb";

export async function RegisterUser(user){

    // We've done the validations before at this point
    const mongoClient = await getClient();
    const db = await mongoClient.db();
    const users = await db.collection("Users");
    await users.insertOne(user);

}