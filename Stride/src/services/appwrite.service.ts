import {Injectable} from '@angular/core';
import {Account, Client, Databases, Functions, Models, Storage} from "appwrite";

@Injectable({
  providedIn: 'root'
})
export class AppwriteService {

  public isUserAuthorized = false;
  public client: Client;
  public account: Account;
  public functions: Functions;
  public databases: Databases;
  public storage: Storage;

  public jwt = '';

  constructor() {
    this.client = new Client();
    this.client
      .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
      .setProject('6460e9cb8628f9511c24')

    this.account = new Account(this.client);
    if(localStorage.getItem('isCurrentSession') === 'true') {
      this.isUserAuthorized = true;
    } else {
      this.account.getSession('current').then((response) => {
        localStorage.setItem('isCurrentSession', JSON.stringify(response.current));
        this.isUserAuthorized = response.current;
      }, (_) => {
        this.isUserAuthorized = false;
      });
    }

    this.functions = new Functions(this.client);
    this.databases = new Databases(this.client);
    this.account.createJWT().then((response) => {
      this.jwt = response.jwt;
    })


    this.storage = new Storage(this.client);

  }
}
