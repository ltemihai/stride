import {Injectable} from '@angular/core';
import {Account, Client, ID, Models} from "appwrite";
import {ClientService} from "./client.service";
// @ts-ignore
import Preferences = Models.Preferences;
import {AppwriteService} from "./appwrite.service";
import {APPWRITE_COLLECTION_USER_PREFS_ID, APPWRITE_DATABASE_ID} from "../consts/appwrite.consts";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public client: Client
  public user!: Preferences;
  constructor(private clientService: ClientService,
              private appwriteService: AppwriteService) {
    this.client = clientService.getClient();
    this.getAccount().then((user) => {
      this.user = user;
    })
  }

  public async login(email: string, password: string) {
    const account = new Account(this.client);
    return Promise.all([
      account.createJWT(),
      account.createEmailSession(email, password)
    ]);
  }

  public updatePreferences(preferences: Preferences) {
    this.appwriteService.databases.updateDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTION_USER_PREFS_ID,
      this.user['$id'],
      {
        ...preferences,
        avatarUrl: preferences['avatarUrl'] || ''
      }
    );
  }

  public getUserPreferences()  {
    return this.appwriteService.databases.getDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTION_USER_PREFS_ID,
      this.user['$id'],
    )
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
