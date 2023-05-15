import {Client} from "appwrite";

export const generateAppwriteClient = (): Client => {
    const client = new Client();

    client
        .setEndpoint(process.env.APPWRITE_ENDPOINT as string)
        .setProject(process.env.APPWRITE_PROJECT_ID as string)

    console.log('CLIENT GENERATED');

    return client;
}
