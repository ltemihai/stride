import {ChangeDetectionStrategy, Component, Inject, Injector} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TuiBlockStatusModule} from '@taiga-ui/layout';

import {ReactiveFormsModule} from '@angular/forms';
import {TuiInputModule} from '@taiga-ui/kit';

import {FormGroup, FormControl, Validators} from '@angular/forms';
import {TuiButtonModule, TuiDialogModule, TuiDialogService} from "@taiga-ui/core";
import {SignupFormComponent} from "./components/signup-form/signup-form.component";
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';

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
    @Inject(Injector) private readonly injector: Injector,
  ) {
  }

  protected form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })


  protected login() {
    console.log('login', this.form.value);
  }

  openSignupModal() {
    this.dialogs.open<number>(
      new PolymorpheusComponent(SignupFormComponent, this.injector)
    ).subscribe(x => {
      console.log('dialog result', x);
    });
  }
}
