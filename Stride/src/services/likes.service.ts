import {Injectable} from '@angular/core';
import {AppwriteService} from "./appwrite.service";

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  private readonly LIKE_FUNCTION_ID = '64667075564727c061da'

  constructor(private appwriteService: AppwriteService){
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
