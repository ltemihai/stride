import {ChangeDetectionStrategy, Component, Inject, Injector} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TuiBlockStatusModule} from '@taiga-ui/layout';

import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TuiInputModule} from '@taiga-ui/kit';
import {TuiButtonModule, TuiDialogModule, TuiDialogService} from "@taiga-ui/core";
import {SignupFormComponent} from "./components/signup-form/signup-form.component";
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {Router} from "@angular/router";
import {AlertService} from "../../services/alert.service";
import {AppwriteService} from "../../services/appwrite.service";
import {ID} from "appwrite";
import {APPWRITE_COLLECTION_USER_PREFS_ID, APPWRITE_DATABASE_ID} from "../../consts/appwrite.consts";
import {fadeInAnimation} from "../../consts/animations.consts";

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation]
})
export class LoginComponent {

  constructor(
    private readonly dialogs: TuiDialogService,
    private readonly appwriteService: AppwriteService,
    private readonly router: Router,
    private readonly alertService: AlertService,
    @Inject(Injector) private readonly injector: Injector,
  ) {
  }

  protected form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })


  protected loginClicked() {
    this.login(this.form.value.email!, this.form.value.password!);
  }

  openSignupModal() {
    this.dialogs.open<{
      email: string,
      password: string,
    }>(
      new PolymorpheusComponent(SignupFormComponent, this.injector)
    ).subscribe(x => {
      this.appwriteService.account.create(ID.unique(), x.email, x.password)
        .then((response) => {
          this.appwriteService.databases.createDocument(
            APPWRITE_DATABASE_ID,
            APPWRITE_COLLECTION_USER_PREFS_ID,
            response.$id,
            {
              birthday: Date.now(),
            }
          ).then((_) => {
            this.alertService.success('Signed up successfully!')
            this.login(x.email, x.password);
          })
        }, (_) => {
          this.alertService.error('Something went wrong!');
        })
    });
  }

  login(email: string, password: string) {
    this.appwriteService.account.createEmailSession(email, password)
      .then((response) => {
        this.appwriteService.isUserAuthorized = response.current;
        this.alertService.success('Logged in successfully!');
        this.router.navigate(['/home']).then();
      }, (_) => {
        this.alertService.error('Something went wrong!');
      })
  }
}
