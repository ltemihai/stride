import {ChangeDetectionStrategy, ChangeDetectorRef, Injectable} from '@angular/core';
import {ClientService} from "./client.service";
import {Subject} from "rxjs";
import {AppwriteService} from "./appwrite.service";
import {Client, Models, Query} from "appwrite";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  matches: Subject<Document[]> = new Subject<Document[]>()
  constructor(private clientService: ClientService,
              private userService: UserService,
              private appwriteService: AppwriteService) {

  }

  public getMatches() {
    this.userService.getAccount().then((account) => {
      this.appwriteService.databases.listDocuments('64666d1e831778f95d38','64666fe04005f9c46714', [Query.equal('matcherId', account['$id'])]).then((response) => {
        this.matches.next(response.documents as any);
      });
    })

  }

  public subscribeToMatchesEvents(callbackFn: any) {
    this.clientService.client.subscribe('databases.64666d1e831778f95d38.collections.64666fe04005f9c46714.documents', (response) => {
      this.getMatches();
    });
  }

}
