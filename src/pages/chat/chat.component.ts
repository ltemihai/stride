import {Component, ElementRef, OnInit, ViewChildren} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatchesService} from "../../services/matches.service";
import {ActivatedRoute} from "@angular/router";
import {Observable, Subject, switchMap, tap} from "rxjs";
import {TuiInputModule, TuiIslandModule, TuiMarkerIconModule} from "@taiga-ui/kit";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChatService} from "../../services/chat.service";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, TuiInputModule, FormsModule, ReactiveFormsModule, TuiMarkerIconModule, TuiIslandModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  @ViewChildren('tui-island') private chat: ElementRef[] = [];

  match$!: Observable<any>;
  messages$: Subject<any> = new Subject<any>();
  message: string = '';

  receiverId = '';
  constructor(
    readonly route: ActivatedRoute,
    readonly matchesService: MatchesService,
    public chatService: ChatService,
  ) {

  }

  ngOnInit(): void {
    this.messages$ = this.chatService.messages$;
    this.messages$.pipe(tap(() => {
      if (this.chat?.length) {
        this.chat[this.chat.length - 1].nativeElement.scrollIntoView();
      }
    }))
    this.match$ = this.route.params.pipe(
      tap(params => {
        this.receiverId = params['id'];
        this.chatService.getMessages(this.receiverId);
        this.chatService.subscribeToChatEvents(this.receiverId);
      }),
      switchMap(params => this.matchesService.getUserPref(params['id'])),
    );
  }

  sendMessage(): void {
    if (this.message) {
      this.chatService.sendMessage(this.receiverId, this.message).subscribe(message => {
        this.message = '';
      })
    }
  }

}
