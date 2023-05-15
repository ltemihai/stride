import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TuiButtonModule} from "@taiga-ui/core";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TuiButtonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

}
