import {Client} from "appwrite";

export const index = () => {
    const client = new Client();

    client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('6460e9cb8628f9511c24');

    console.log('CLIENT SET');

}

index();
