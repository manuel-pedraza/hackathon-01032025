import getClient from "../lib/mongodb/mongodb";

export async function AddJob(job) {

    // We've done the validations before at this point
    const mongoClient = await getClient();
    const db = await mongoClient.db();
    const jobs = await db.collection("Jobs");
    return await jobs.insertOne(job);

}

export async function GetJobOffersByUser(userId) {
    const mongoClient = await getClient();
    const db = await mongoClient.db();
    const jobs = await db.collection("Jobs");
    return await jobs.find({ user: userId }).toArray();
}