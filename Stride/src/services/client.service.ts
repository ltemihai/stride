import {Injectable} from '@angular/core';
import {Client} from "appwrite";
import {APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID} from "../consts/appwrite.consts";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  client!: Client;

  constructor() { }

  createClient(): Client {
    this.client = new Client();
    this.client
      .setEndpoint(APPWRITE_ENDPOINT) // Your API Endpoint
      .setProject(APPWRITE_PROJECT_ID)

    return this.client;
  }

  getClient(): Client {
    return this.client ?? this.createClient();
  }
}
