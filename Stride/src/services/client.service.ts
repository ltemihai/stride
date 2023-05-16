import {Injectable} from '@angular/core';
import {Client} from "appwrite";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  client!: Client;

  constructor() { }

  createClient(): Client {
    this.client = new Client();
    this.client
      .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
      .setProject('6460e9cb8628f9511c24')

    return this.client;
  }

  getClient(): Client {
    return this.client ?? this.createClient();
  }
}
