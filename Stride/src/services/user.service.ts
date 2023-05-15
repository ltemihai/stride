import { Injectable } from '@angular/core';
import {Account, Client, ID, Models} from "appwrite";
// @ts-ignore
import Preferences = Models.Preferences;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public client: Client
  public user!: Preferences;
  constructor() {
    this.client = new Client();
    this.client
      .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
      .setProject('6460e9cb8628f9511c24') // Your project ID
  }

  public async login(email: string, password: string) {
    const account = new Account(this.client);
    return account.createEmailSession(email, password);
  }

  public async signup(email: string, password: string) {
    const account = new Account(this.client);
    return account.create(ID.unique(), email, password, email);
  }

  public async getAccount() {
    if (this.user) {
      return this.user;
    }
    const account = new Account(this.client);
    this.user = await account.get();
    return this.user;
  }
}
