import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TuiMarkerIconModule, TuiSelectModule} from "@taiga-ui/kit";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NavButtonComponent} from "../nav-button/nav-button.component";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, TuiMarkerIconModule, TuiSelectModule, RouterLink, RouterLinkActive, NavButtonComponent],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {

}
