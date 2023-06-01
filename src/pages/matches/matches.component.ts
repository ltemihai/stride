import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserService} from "../../services/user.service";
import {MatchesService} from "../../services/matches.service";
import {TuiButtonModule, TuiDataListModule} from "@taiga-ui/core";
import {Router} from "@angular/router";
import {TuiIslandModule} from "@taiga-ui/kit";

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [CommonModule, TuiButtonModule, TuiDataListModule, TuiIslandModule],
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchesComponent implements OnInit {

  protected matches = [] as any;

  constructor(private userService: UserService,
              private router: Router,
              private matchesService: MatchesService) {
  }

  ngOnInit(): void {
    this.matches = this.matchesService.matches;
    this.matchesService.getMatches();
    this.matchesService.subscribeToMatchesEvents();
  }

  openChat(id: string) {
    this.router.navigate([`/chat/${id}`])
  }



}
