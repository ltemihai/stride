import { Injectable } from '@angular/core';
import {AppwriteService} from "./appwrite.service";
import {concatAll, filter, forkJoin, map, merge, Observable, of, Subject, switchAll, switchMap, tap} from "rxjs";
import {UserService} from "./user.service";
import {APPWRITE_COLLECTION_MESSAGES_ID, APPWRITE_DATABASE_ID} from "../consts/appwrite.consts";
import {ID, Query} from "appwrite";
import {fromPromise} from "rxjs/internal/observable/innerFrom";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  messages!: Observable<any>
  userId!: string
  constructor(private appwriteService: AppwriteService,
              private userService: UserService,) {

  }

  getMessages(receiverId: string) {
    this.userService.getAccount().then((account) => {
      this.userId = account['$id'];
      this.messages = forkJoin(
        fromPromise(this.appwriteService.databases.listDocuments(
          APPWRITE_DATABASE_ID,
          APPWRITE_COLLECTION_MESSAGES_ID,
          [Query.equal('senderId', account['$id'])]
        )),
        fromPromise(this.appwriteService.databases.listDocuments(
          APPWRITE_DATABASE_ID,
          APPWRITE_COLLECTION_MESSAGES_ID,
          [Query.equal('receiverId', receiverId)]
        ))
      )
      .pipe(
        switchMap(([senderMessages, receiverMessages]) => {
          return of(senderMessages.documents.concat(receiverMessages.documents))
        }),
        map((messages) => messages.sort((a,b) => a['timestamp'] > b['timestamp'] ? 1: -1)),
        tap(messages => console.log(messages))
      )
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


}
