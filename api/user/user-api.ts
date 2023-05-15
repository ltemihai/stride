import * as core from "express-serve-static-core";
import {Account, Client, ID} from "appwrite";

export const userApi = (app: core.Express, client: Client) => {
    const CLIENT_PATH = '/user'

    app.get(CLIENT_PATH, (req, res) => {
        const account = new Account(client);
        res.send('Express + TypeScript Server');
    });

    app.post(CLIENT_PATH, (req, res) => {
        const account = new Account(client);

        console.log(req.body);
        // account.create(ID.unique())
        res.send('Express + TypeScript Server');
    });

    app.put(CLIENT_PATH, (req, res) => {
        res.send('Express + TypeScript Server');
    });

    app.delete(CLIENT_PATH, (req, res) => {
        res.send('Express + TypeScript Server');
    });
}
