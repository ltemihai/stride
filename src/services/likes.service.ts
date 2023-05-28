import {Injectable} from '@angular/core';
import {AppwriteService} from "./appwrite.service";
import {Query} from "appwrite";
import {
  APPWRITE_COLLECTION_USER_PREFS_ID,
  APPWRITE_DATABASE_ID,
  APPWRITE_FUNCTION_LIKE_ID
} from "../consts/appwrite.consts";

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  constructor(private appwriteService: AppwriteService){
  }

  getPotentialMatches(accountId: string) {
    return this.appwriteService.databases
      .listDocuments(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_USER_PREFS_ID,
        [Query.notEqual('$id', accountId)]
      )
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
