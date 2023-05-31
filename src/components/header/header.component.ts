import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TuiMarkerIconModule, TuiToggleModule} from "@taiga-ui/kit";
import {TuiBrightness} from "@taiga-ui/core/types/brightness";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TuiToggleModule, TuiMarkerIconModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  @Input() theme!: TuiBrightness
  @Output() onThemeChanged = new EventEmitter<void>

}
