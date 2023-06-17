import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TuiMarkerIconModule} from "@taiga-ui/kit";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-nav-button',
  standalone: true,
  imports: [CommonModule, TuiMarkerIconModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-button.component.html',
  styleUrls: ['./nav-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavButtonComponent {
  @Input() route = [''];
  @Input() icon = '';
  @Input() label = '';
}
