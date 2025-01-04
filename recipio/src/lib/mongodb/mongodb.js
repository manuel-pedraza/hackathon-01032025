import { MongoClient } from "mongodb";

let clientPromise;

async function getClient() {
    if (clientPromise)
        return clientPromise;

    if (!process.env.MONGODB_URI)
        throw new Error("Invalid environment variable: 'MONGODB_URI'");

    const uri = process.env.MONGODB_URI;
    //const options = {
    //    useUnifiedTopology: false
    //};

    // let client = new MongoClient(uri, options);
    let client = new MongoClient(uri);

    if (process.env.NODE_ENV === "development") {
        // In development mode, use a global variable so that the value
        // Is preserved across module reloads caused by HMR (Hot Module Replacement).

        if (!global._mongoClientPromise) {
            global._mongoClientPromise = await client.connect();
        }
        clientPromise = global._mongoClientPromise;
    } else {
        // In production monde, it's best to not use a global variable.
        clientPromise = await client.connect();
    }

    return clientPromise;
}

// Export a module-scoped MongoClient promise, By doing thos in a
// separate module, the client can be shared across functions.
// export default clientPromise;
export default getClient;
