import {Injectable} from '@angular/core';
import {Account, Client, Databases, Functions} from "appwrite";

@Injectable({
  providedIn: 'root'
})
export class AppwriteService {

  public isUserAuthorized = false;
  public client: Client;
  public account: Account;
  public functions: Functions;
  public databases: Databases;

  constructor() {
    this.client = new Client();
    this.client
      .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
      .setProject('6460e9cb8628f9511c24')

    this.account = new Account(this.client);
    this.account.getSession('current').then((response) => {
      this.isUserAuthorized = response.current;
    }, (_) => {
      this.isUserAuthorized = false;
    });

    this.functions = new Functions(this.client);
    this.databases = new Databases(this.client);
  }
}
