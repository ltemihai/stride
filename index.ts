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
import {generateSwagger} from "./api/swagger/swagger";
import bodyParser from "body-parser";

dotenv.config({path: 'config.env'});

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const port = process.env.PORT;

const appwriteClient = generateAppwriteClient();

generateSwagger(app);
userApi(app, appwriteClient);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
