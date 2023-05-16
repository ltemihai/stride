import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserService} from "../../services/user.service";
import {Models} from "appwrite";
import {MatchesService} from "../../services/matches.service";
import Preferences = Models.Preferences;

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchesComponent implements OnInit {

  constructor(private userService: UserService, private matchesService: MatchesService) {
  }

  ngOnInit(): void {

  }



}
