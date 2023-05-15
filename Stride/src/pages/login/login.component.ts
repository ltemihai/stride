import {ChangeDetectionStrategy, Component, Inject, Injector} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TuiBlockStatusModule} from '@taiga-ui/layout';

import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TuiInputModule} from '@taiga-ui/kit';
import {TuiButtonModule, TuiDialogModule, TuiDialogService} from "@taiga-ui/core";
import {SignupFormComponent} from "./components/signup-form/signup-form.component";
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    TuiBlockStatusModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiButtonModule,
    TuiDialogModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  constructor(
    private readonly dialogs: TuiDialogService,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly alertService: AlertService,
    @Inject(Injector) private readonly injector: Injector,
  ) {
  }

  protected form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })


  protected login() {
    this.userService.login(this.form.value.email!, this.form.value.password!)
      .then(() => {
          this.alertService.success('Logged in successfully!');
          this.router.navigate(['/home']).then();
      }
      )
      .catch(() => {
        this.alertService.error('Something went wrong!');
      });
  }

  openSignupModal() {
    this.dialogs.open<{
      email: string,
      password: string,
    }>(
      new PolymorpheusComponent(SignupFormComponent, this.injector)
    ).subscribe(x => {
      this.userService.signup(x.email, x.password)
        .then(() => {
          this.alertService.success('Signed up successfully!')
          this.userService.login(x.email, x.password)
            .then(() => this.router.navigate(['/home']).then())
        })
        .catch(() => {
          this.alertService.error('Something went wrong!');
        });
    });
  }
}
