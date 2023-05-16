import {Injectable} from '@angular/core';
import {ClientService} from "./client.service";
import {Client} from "appwrite";

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  client!: Client
  constructor(private clientService: ClientService) {
    this.client = clientService.getClient();
  }

  getMatches() {
    return this.client.subscribe('/database/collections/60b0c5b0b1e8a', (response) => {
      console.log(response);
    });
  }
}
