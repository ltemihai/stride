import {Injectable} from '@angular/core';
import {AppwriteService} from "./appwrite.service";

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  constructor(private appwriteService: AppwriteService){
  }

  like(matchId: string, matcherId: string, isLiked: boolean) {
    return this.appwriteService.functions.createExecution('64636e506736dc6077aa', JSON.stringify({
      match: matchId,
      matcher: matcherId,
      isLiked: isLiked,
      jwt: this.appwriteService.account.createJWT()
    }));
  }
}
