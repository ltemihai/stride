import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {ID, Models} from "appwrite";
import {TuiAvatarModule, TuiFileLike, TuiInputDateModule, TuiInputFilesModule, TuiInputModule} from "@taiga-ui/kit";
import {TuiButtonModule} from "@taiga-ui/core";
import {AppwriteService} from "../../services/appwrite.service";
import {Router} from "@angular/router";
import {AlertService} from "../../services/alert.service";
import {TUI_LAST_DAY, TuiDay} from '@taiga-ui/cdk';
// @ts-ignore
import Preferences = Models.Preferences;
import {fadeInAnimation} from "../../consts/animations.consts";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, TuiInputModule, ReactiveFormsModule, TuiButtonModule, TuiInputFilesModule, TuiAvatarModule, TuiInputDateModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation]
})
export class ProfileComponent implements OnInit {

  // @ts-ignore
  public form: FormGroup<IUserPreferencesForm> = new FormGroup({
    displayName: new FormControl('', [Validators.required]),
    birthday: new FormControl(new TuiDay(new Date().getFullYear(), new Date().getMonth(), new Date().getDay()), [Validators.required]),
    location: new FormControl('', [Validators.required]),
    avatarUrl: new FormControl(null, [Validators.required]),
    longestRun: new FormControl(0, [Validators.required]),
    currentPace: new FormControl(0, [Validators.required]),
    target: new FormControl('', [Validators.required]),
  });

  public avatarFile: TuiFileLike = {
    name: ''
  };
  public img!: string;

  constructor(private userService: UserService,
              private router: Router,
              private alertService: AlertService,
              private appwriteService: AppwriteService) {

  }

  ngOnInit(): void {
    this.userService.getUserPreferences().then((userPref) => {
      this.mapUserToForm(userPref)
      const birthday = this.form.controls['birthday'].value?.toUtcNativeDate().valueOf();
      this.form.controls.avatarUrl.valueChanges.subscribe((value) => {
        this.appwriteService.storage.createFile('64693ceeed255ec7abf9', ID.unique(), value as File).then((result) => {
          this.userService.updatePreferences({
            ...this.form.value,
            avatarUrl: result.$id,
            birthday: birthday
          }).then((_) => {
            this.alertService.success(`You've successfully uploaded your photo!`)
            this.form.controls['avatarUrl'].setValue(result.$id)
            this.img = this.appwriteService.storage.getFilePreview('64693ceeed255ec7abf9', result.$id).href;
          }, (_) => {
            this.alertService.error(`There was an error uploading your photo!`)
          });
        })
      });
    })
  }

  public saveUserPreferences() {
    const birthday = this.form.controls['birthday'].value?.toUtcNativeDate().valueOf();
    this.userService.updatePreferences({
      ...this.form.value,
      birthday: birthday
    }).then((_) => {
      this.alertService.success(`You've successfully updated your profile!`)
    }, (_) => {
      this.alertService.error(`There was an error updating your profile!`)
    });
  }

  public signOut() {
    this.appwriteService.account.deleteSessions().then(() => {
      localStorage.clear();
      this.appwriteService.isUserAuthorized = false;
      this.router.navigate(['/login']).then(x => location.reload())
    });
  }

  private mapUserToForm(userPref: Preferences) {
    this.form.setValue({
      displayName: userPref?.['displayName'] ?? '',
      birthday: userPref?.['birthday'] ? new TuiDay(new Date(userPref?.['birthday']).getFullYear(), new Date(userPref?.['birthday']).getMonth(), new Date(userPref?.['birthday']).getDay()) :
        new TuiDay(new Date().getFullYear(), new Date().getMonth(), new Date().getDay()),
      location: userPref?.['location'] ?? '',
      avatarUrl: userPref?.['avatarUrl'] ?? '',
      longestRun: userPref?.['longestRun'] ?? null,
      currentPace: userPref?.['currentPace'] ?? null,
      target: userPref?.['target'] ?? '',
    })

    if (userPref?.['avatarUrl']) {
      this.img = this.appwriteService.storage.getFilePreview('64693ceeed255ec7abf9', userPref?.['avatarUrl']).href;
    }
  }

}

export interface IUserPreferencesForm {
  displayName: FormControl<string | null>;
  birthday: FormControl<TuiDay | null>;
  location: FormControl<string | null>;
  avatarUrl: FormControl<string | File | null>;
  longestRun: FormControl<number | null>;
  currentPace: FormControl<number | null>;
  target: FormControl<string | null>;
}
