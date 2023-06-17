import {Component, OnInit} from '@angular/core';
import {AppwriteService} from "../services/appwrite.service";
import {Router} from "@angular/router";
import {ClientService} from "../services/client.service";
import {BehaviorSubject} from "rxjs";
import {TuiBrightness} from "@taiga-ui/core/types/brightness";
import {fadeInAnimation} from "../consts/animations.consts";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeInAnimation]
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
