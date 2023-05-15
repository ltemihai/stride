import * as core from "express-serve-static-core";
import {Account, Client, ID} from "appwrite";

export const userApi = (app: core.Express, client: Client) => {
    const CLIENT_PATH = '/user'

    /**
     * @swagger
     * /user:
     *      get:
     *          summary: Get users
     *          description: Get users
     *          responses:
     *              200:
     *                  description: Users
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: object
     */
    app.get(CLIENT_PATH, (req, res) => {
        const account = new Account(client);
        res.send(JSON.stringify(account));
    });

    /**
     * @swagger
     * /user/{userId}:
     *      get:
     *          summary: Get user by ID
     *          description: Get user by ID
     *          parameters:
     *          - in: path
     *            name: userId
     *            schema:
     *              type: string
     *            required: true
     *            description: User ID
     *          responses:
     *              200:
     *                  description: Users
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: object
     */
    app.get(`${CLIENT_PATH}/:userId`, (req, res) => {
        const account = new Account(client);
        res.send(JSON.stringify(account));
    });

    /**
     * @swagger
     * /user/login:
     *      post:
     *          summary: Login User
     *          description: Login User
     *          requestBody:
     *              description: Login User
     *              required: true
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              email:
     *                                  type: string
     *                              password:
     *                                  type: string
     *
     *          responses:
     *              200:
     *                  description: Login
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: object
     */
    app.post(`${CLIENT_PATH}/login`, (req, res) => {
        const account = new Account(client);
        account.createEmailSession(req.body.email, req.body.password)
            .then((response) => {
                res.send(JSON.stringify(response));
            })


    });

    /**
     * @swagger
     * /user:
     *      post:
     *          summary: Create a user
     *          description: Create a user
     *          requestBody:
     *              description: User object
     *              required: true
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              username:
     *                                  type: string
     *                              email:
     *                                  type: string
     *                              password:
     *                                  type: string
     *                              name:
     *                                  type: string
     *
     *          responses:
     *              200:
     *                  description: Users
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: object
     */
    app.post(CLIENT_PATH, (req, res) => {
        const account = new Account(client);

        console.log(req.body);

        account.create(ID.unique(), req.body.email, req.body.password, req.body.name)
            .then((response) => {
                    res.send(JSON.stringify(response));
                }
            )

    });


    app.put(CLIENT_PATH, (req, res) => {
        res.send('Express + TypeScript Server');
    });


    app.delete(CLIENT_PATH, (req, res) => {
        res.send('Express + TypeScript Server');
    });
}
