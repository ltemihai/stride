import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TuiButtonModule} from "@taiga-ui/core";
import {UserService} from "../../services/user.service";
import {LikesService} from "../../services/likes.service";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TuiButtonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  constructor(private readonly userService: UserService,
              private readonly likesService: LikesService,
              private readonly alertService: AlertService
  ) {

  }
  setMatch(matchId: string = '646276710b89412e917e', isMatch: boolean) {
    this.userService.getAccount().then((account) => {
      this.likesService.like(account['$id'], matchId, isMatch)
        .then(() => this.alertService.success('It\'s a match!'))
        .catch(() => this.alertService.error('Something went wrong!'))
    })
  }
}
