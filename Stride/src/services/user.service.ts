import {Injectable} from '@angular/core';
import {Account, Client, ID, Models} from "appwrite";
import {ClientService} from "./client.service";
// @ts-ignore
import Preferences = Models.Preferences;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public client: Client
  public user!: Preferences;
  constructor(private clientService: ClientService) {
    this.client = clientService.getClient();
  }

  public async login(email: string, password: string) {
    const account = new Account(this.client);
    return Promise.all([
      account.createJWT(),
      account.createEmailSession(email, password)
    ]);
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
