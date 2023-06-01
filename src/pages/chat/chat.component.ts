import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatchesService} from "../../services/matches.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, of, switchMap, tap} from "rxjs";
import {TuiInputModule, TuiIslandModule, TuiMarkerIconModule} from "@taiga-ui/kit";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChatService} from "../../services/chat.service";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, TuiInputModule, FormsModule, ReactiveFormsModule, TuiMarkerIconModule, TuiIslandModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit{

  match$!: Observable<any>;
  messages$!: Observable<any>;
  message: string = '';

  receiverId = '';
  constructor(
    readonly route: ActivatedRoute,
    readonly matchesService: MatchesService,
    readonly chatService: ChatService,
  ) {

  }

  ngOnInit(): void {
    this.match$ = this.route.params.pipe(
      tap(params => {
        this.messages$ = this.chatService.messages;
        this.receiverId = params['id'];
        this.chatService.getMessages(this.receiverId)
      }),
      switchMap(params => this.matchesService.getUserPref(params['id'])),
      tap(x => console.log(x))
    );

  }

  sendMessage(): void {
    if (this.message) {
      this.chatService.sendMessage(this.receiverId, this.message).subscribe(message => {
        this.chatService.messages = of(this.chatService.messages.pipe(switchMap(x => of(x.concat([message])))))
      })
    }

  }

}
