import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserService} from "../../services/user.service";
import {Models} from "appwrite";
import {MatchesService} from "../../services/matches.service";
import {TuiButtonModule, TuiDataListModule} from "@taiga-ui/core";
import {tap} from "rxjs";

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [CommonModule, TuiButtonModule, TuiDataListModule],
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchesComponent implements OnInit {

  protected matches = [] as any;

  constructor(private userService: UserService,
              private matchesService: MatchesService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.matches = this.matchesService.matches
    this.matchesService.getMatches();
    this.matchesService.subscribeToMatchesEvents(() => {
      this.cdr.detectChanges()
    });
  }



}
