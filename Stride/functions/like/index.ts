import {Client, Databases, ID} from "appwrite";

const match = async (options: {
  matchId: string,
  matcherId: string,
  isLiked: boolean,
}) => {
  const client = new Client();

  client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('6460e9cb8628f9511c24') //

  const database = new Databases(client);
  await database.createDocument(
    '64627a4a87730c2c4fd1',
    '64627a793235eaf0d9f1',
    ID.unique(),
    options
  )
}

export default match;
