import {Injectable} from '@angular/core';
import {ClientService} from "./client.service";
import {Subject} from "rxjs";
import {AppwriteService} from "./appwrite.service";
import {Query} from "appwrite";
import {UserService} from "./user.service";
import {APPWRITE_COLLECTION_USER_PREFS_ID, APPWRITE_DATABASE_ID, APPWRITE_MATCHES_ID} from "../consts/appwrite.consts";

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  matches: Subject<any[]> = new Subject<any[]>()
  constructor(private clientService: ClientService,
              private userService: UserService,
              private appwriteService: AppwriteService) {

  }

  public getMatches() {
    this.userService.getAccount().then((account) => {
      this.appwriteService.databases.listDocuments(APPWRITE_DATABASE_ID,
        APPWRITE_MATCHES_ID,
        [Query.equal('matcherId', account['$id'])])
        .then((response) => {
          const matchesIds = response.documents.map(x => x['matchId']);
          this.appwriteService.databases.listDocuments(
            APPWRITE_DATABASE_ID,
            APPWRITE_COLLECTION_USER_PREFS_ID,
            [Query.equal('$id', matchesIds)]
          ).then(users => {
            this.matches.next(users.documents.map(user => {
              return {
                id: user['$id'],
                displayName: user['displayName'],
                avatarUrl: this.appwriteService.storage.getFilePreview('64693ceeed255ec7abf9', user['avatarUrl']).href,
                birthday: user['birthday']
              }
            }));
          })
      });
    })

  }

  public subscribeToMatchesEvents() {
    this.clientService.client.subscribe(`databases.${APPWRITE_DATABASE_ID}.collections.${APPWRITE_MATCHES_ID}.documents`, (_) => {
      this.getMatches();
    });
  }

}
