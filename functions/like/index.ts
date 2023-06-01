import {Client, Databases, ID} from "appwrite";
import {APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID} from "../../src/consts/appwrite.consts";

const match = async (options: {
  matchId: string,
  matcherId: string,
  isLiked: boolean,
}) => {

  const DATABASE_ID = '64627a4a87730c2c4fd1';
  const MATCHES_COLLECTION_ID = '6478ff9a315fb2844546';


  const client = new Client();

  client
    .setEndpoint(APPWRITE_ENDPOINT) // Your API Endpoint
    .setProject(APPWRITE_PROJECT_ID) //

  const database = new Databases(client);
  await database.createDocument(
    DATABASE_ID,
    MATCHES_COLLECTION_ID,
    ID.unique(),
    options
  )
}

export default match;
