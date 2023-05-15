import { Component } from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Stride';

  constructor(private userService: UserService, private router: Router) {
    this.userService.getAccount()
      .then(() => { this.router.navigate(['/home']).then() })
      .catch(() => { this.router.navigate(['/login']).then() })
  }
}
