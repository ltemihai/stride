import {Injectable} from '@angular/core';
import {AppwriteService} from "./appwrite.service";
import {Query} from "appwrite";

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  private readonly LIKE_FUNCTION_ID = '64667075564727c061da'

  constructor(private appwriteService: AppwriteService){
  }

  getPotentialMatches(accountId: string) {
    return this.appwriteService.databases
      .listDocuments(
        '64666d1e831778f95d38',
        '646a7e95ea7d2f174e2f',
        [Query.notEqual('$id', accountId)]
      )
  }

  like(matchId: string, matcherId: string, isLiked: boolean) {
    return this.appwriteService.functions.createExecution(this.LIKE_FUNCTION_ID, JSON.stringify({
      matchId: matchId,
      matcherId: matcherId,
      isLiked: isLiked,
      jwt: this.appwriteService.jwt
    }));
  }
}
