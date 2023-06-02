import {Injectable} from '@angular/core';
import {AppwriteService} from "./appwrite.service";
import {Query} from "appwrite";
import {
  APPWRITE_COLLECTION_USER_PREFS_ID,
  APPWRITE_DATABASE_ID,
  APPWRITE_FUNCTION_LIKE_ID, APPWRITE_MATCHES_ID
} from "../consts/appwrite.consts";
import {forkJoin, map, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  constructor(private appwriteService: AppwriteService){
  }

  getPotentialMatches(accountId: string) {
    return forkJoin([
      this.appwriteService.databases
        .listDocuments(
          APPWRITE_DATABASE_ID,
          APPWRITE_COLLECTION_USER_PREFS_ID,
          [Query.notEqual('$id', accountId)]
        ),
      this.appwriteService.databases
        .listDocuments(
          APPWRITE_DATABASE_ID,
          APPWRITE_MATCHES_ID,
          [Query.equal('matcherId', accountId)]
        )
    ]).pipe(map(([potentialMatches, actualMatches]) => {
        return potentialMatches.documents.filter(x => {
          return !actualMatches.documents.some(y => y['matchId'] === x['$id'])
        });
      }
    ))
  }

  like(matchId: string, matcherId: string, isLiked: boolean) {
    return this.appwriteService.functions.createExecution(APPWRITE_FUNCTION_LIKE_ID, JSON.stringify({
      matchId: matchId,
      matcherId: matcherId,
      isLiked: isLiked,
      jwt: this.appwriteService.jwt
    }));
  }
}
