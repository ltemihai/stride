import {ChangeDetectionStrategy, Component, Inject, Injector} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TuiBlockStatusModule} from '@taiga-ui/layout';

import {ReactiveFormsModule} from '@angular/forms';
import {TuiInputModule} from '@taiga-ui/kit';

import {FormGroup, FormControl, Validators} from '@angular/forms';
import {TuiButtonModule, TuiDialogModule, TuiDialogService} from "@taiga-ui/core";
import {SignupFormComponent} from "./components/signup-form/signup-form.component";
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {UserService} from "../../services/user.service";

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
    @Inject(Injector) private readonly injector: Injector,
  ) {
  }

  protected form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })


  protected login() {
    this.userService.login(this.form.value.email!, this.form.value.password!)
      .then((response) => console.log(response));
  }

  protected get() {
    this.userService.getAccount().then((response) => console.log(response));
  }

  openSignupModal() {
    this.dialogs.open<{
      email: string,
      password: string,
    }>(
      new PolymorpheusComponent(SignupFormComponent, this.injector)
    ).subscribe(x => {
      console.log(x);
      this.userService.signup(x.email, x.password)
        .then((response) => console.log(response))
    });
  }
}
