import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Form, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {ID, Models} from "appwrite";
// @ts-ignore
import Preferences = Models.Preferences;
import {TuiAvatarModule, TuiFileLike, TuiInputFilesModule, TuiInputModule} from "@taiga-ui/kit";
import {TuiButtonModule} from "@taiga-ui/core";
import {AppwriteService} from "../../services/appwrite.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, TuiInputModule, ReactiveFormsModule, TuiButtonModule, TuiInputFilesModule, TuiAvatarModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {

  // @ts-ignore
  public form: FormGroup<IUserPreferencesForm> = new FormGroup({
    displayName: new FormControl('', [Validators.required]),
    birthday: new FormControl(0, [Validators.required]),
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
              private appwriteService: AppwriteService) {

  }

  ngOnInit(): void {
    this.userService.getUserPreferences().then((userPref) => {
      this.mapUserToForm(userPref)
      this.form.controls.avatarUrl.valueChanges.subscribe((value) => {
        this.appwriteService.storage.createFile('64693ceeed255ec7abf9', ID.unique(), value as File).then((result) => {
          this.userService.updatePreferences({
            ...this.form.value,
            avatarUrl: result.$id
          });
        })
      });
    })
  }

  public saveUserPreferences() {
    this.userService.updatePreferences(this.form.value);
  }

  public signOut() {
    this.appwriteService.account.deleteSessions().then(() => {
      localStorage.clear();
      this.appwriteService.isUserAuthorized = false;
      this.router.navigate(['/login'])
    });
  }

  private mapUserToForm(userPref: Preferences) {
    this.form.setValue({
      displayName: userPref?.['displayName'] ?? '',
      birthday: userPref?.['birthday'] ?? null,
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
  birthday: FormControl<number | null>;
  location: FormControl<string | null>;
  avatarUrl: FormControl<string | File | null>;
  longestRun: FormControl<number | null>;
  currentPace: FormControl<number | null>;
  target: FormControl<string | null>;
}
