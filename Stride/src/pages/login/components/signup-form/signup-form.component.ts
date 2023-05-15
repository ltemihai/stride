import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TuiInputModule} from "@taiga-ui/kit";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TuiButtonModule, TuiDialogContext, TuiDialogService} from "@taiga-ui/core";
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [CommonModule, TuiInputModule, ReactiveFormsModule, TuiButtonModule],
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupFormComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(@Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
              @Inject(POLYMORPHEUS_CONTEXT)
              private readonly context: TuiDialogContext<boolean, number>,) {
  }

  createAccount() {
    console.log('createAccount', this.form.value);
    this.context.completeWith(true);
  }
}
