import {Component, Inject, OnInit} from '@angular/core';
import {AppwriteService} from "../services/appwrite.service";
import {Router} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ClientService} from "../services/client.service";
import {TuiNightThemeService} from "@taiga-ui/core";
import {BehaviorSubject, Observable, Subject, take} from "rxjs";
import {TuiBrightness} from "@taiga-ui/core/types/brightness";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(-100%,0,0)'
      })),
      state('out', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      transition('in => out', animate('200ms ease-in-out')),
      transition('out => in', animate('200ms ease-in-out'))
    ]),
  ]
})
export class AppComponent implements OnInit{
  title = 'Stride';

  theme$: BehaviorSubject<TuiBrightness> = new BehaviorSubject<TuiBrightness>('onDark')

  isLoggedIn = false;

  constructor(readonly appwriteService: AppwriteService,
              private router: Router, private clientService: ClientService) {
    this.isLoggedIn = this.appwriteService.isUserAuthorized;
    this.router.events.subscribe(() => {
      this.isLoggedIn = this.appwriteService.isUserAuthorized;
    })
  }

  changeTheme(currentTheme: TuiBrightness) {
    this.theme$.next(currentTheme === 'onDark' ? 'onLight' : 'onDark')
  }

  ngOnInit(): void {
    this.theme$.next('onDark');
  }


}
