import {Client} from "appwrite";

export const index = () => {
    const client = new Client();

    client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('6460e9cb8628f9511c24');

    console.log('CLIENT SET');

}

index();


import express from "express";
import dotenv from "dotenv";
import {userApi} from "./api/user/user-api";
import {generateAppwriteClient} from "./client/client";

dotenv.config({path: 'config.env'});

const app = express();
const port = process.env.PORT;

const appwriteClient = generateAppwriteClient();

userApi(app, appwriteClient);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
