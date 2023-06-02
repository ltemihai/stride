import {Injectable} from '@angular/core';
import {Account, Client, Databases, Functions, Storage} from "appwrite";
import {APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID} from "../consts/appwrite.consts";

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
      .setEndpoint(APPWRITE_ENDPOINT) // Your API Endpoint
      .setProject(APPWRITE_PROJECT_ID)

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
    }, (_) => {
      localStorage.clear();
      this.isUserAuthorized = false;
    })


    this.storage = new Storage(this.client);

  }
}
