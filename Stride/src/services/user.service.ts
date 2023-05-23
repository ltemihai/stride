import {Injectable} from '@angular/core';
import {Account, Client, ID, Models} from "appwrite";
import {ClientService} from "./client.service";
// @ts-ignore
import Preferences = Models.Preferences;
import {AppwriteService} from "./appwrite.service";

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
    const account = new Account(this.client);
    console.log(this.user);
    this.appwriteService.databases.updateDocument(
      '64666d1e831778f95d38',
      '646a7e95ea7d2f174e2f',
      this.user['$id'],
      {
        ...preferences,
        avatarUrl: preferences['avatarUrl'] || ''
      }
    );
  }

  public getUserPreferences()  {
    return this.appwriteService.databases.getDocument(
      '64666d1e831778f95d38',
      '646a7e95ea7d2f174e2f',
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
