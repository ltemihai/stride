import { Injectable } from '@angular/core';
import {AppwriteService} from "./appwrite.service";
import {concatAll, filter, forkJoin, map, merge, Observable, of, Subject, switchAll, switchMap, tap} from "rxjs";
import {UserService} from "./user.service";
import {APPWRITE_COLLECTION_MESSAGES_ID, APPWRITE_DATABASE_ID} from "../consts/appwrite.consts";
import {ID, Query} from "appwrite";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {ClientService} from "./client.service";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  isSubscribed = false;

  messages$: Subject<any> = new Subject<any>();
  userId!: string
  constructor(readonly appwriteService: AppwriteService,
              readonly clientService: ClientService,
              readonly userService: UserService,) {

  }

  getMessages(receiverId: string) {
    this.userService.getAccount().then((account) => {
      this.userId = account['$id'];
      forkJoin(
        fromPromise(this.appwriteService.databases.listDocuments(
          APPWRITE_DATABASE_ID,
          APPWRITE_COLLECTION_MESSAGES_ID,
          [Query.equal('senderId', account['$id']), Query.orderDesc('timestamp')]
        )),
        fromPromise(this.appwriteService.databases.listDocuments(
          APPWRITE_DATABASE_ID,
          APPWRITE_COLLECTION_MESSAGES_ID,
          [Query.equal('senderId', receiverId), Query.orderDesc('timestamp')]
        ))
      )
      .pipe(
        switchMap(([senderMessages, receiverMessages]) => {
          return of(senderMessages.documents.concat(receiverMessages.documents))
        }),
        map((messages) => messages.sort((a,b) => a['timestamp'] > b['timestamp'] ? 1: -1)),
      ).subscribe((x) => {
          this.messages$.next(x)
      })
    })
  }

  sendMessage(receiverId: string, message: string) {
    return fromPromise(this.appwriteService.databases.createDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTION_MESSAGES_ID,
      ID.unique(),
      {
        senderId: this.userId,
        receiverId: receiverId,
        message: message,
        timestamp: Date.now()
      }
    ))
  }

  public subscribeToChatEvents(receiverId: string) {
    if (!this.isSubscribed) {
      this.clientService.client.subscribe(`databases.${APPWRITE_DATABASE_ID}.collections.${APPWRITE_COLLECTION_MESSAGES_ID}.documents`, (what) => {
        this.getMessages(receiverId);
      });
      this.isSubscribed = true;
    }
  }


}
