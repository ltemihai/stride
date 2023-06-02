import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {TuiButtonModule} from "@taiga-ui/core";
import {UserService} from "../../services/user.service";
import {LikesService} from "../../services/likes.service";
import {AlertService} from "../../services/alert.service";
import {AppwriteService} from "../../services/appwrite.service";
import {TuiIslandModule, TuiMarkerIconModule} from "@taiga-ui/kit";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TuiButtonModule, NgOptimizedImage, TuiMarkerIconModule, TuiIslandModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  public isLoaded = false;

  protected potentialMatches: {
    avatarUrl: string,
    displayName: string,
    age: number,
    location: string,
    id: string,
    target: string,
    longestRun: string,
    currentPace: string,
  }[] = [];

  protected currentMatch: {
    avatarUrl: string,
    displayName: string,
    age: number,
    location: string,
    id: string,
    target: string,
    longestRun: string,
    currentPace: string,
  } | null = null;

  public isMatching = false;

  constructor(private readonly userService: UserService,
              private readonly likesService: LikesService,
              private readonly alertService: AlertService,
              private readonly appwriteService: AppwriteService,
              private readonly cdr: ChangeDetectorRef,
  ) {

  }



  ngOnInit(): void {
    this.getMatches();
  }

  getMatches() {
    this.userService.getAccount().then((account) => {
      this.likesService.getPotentialMatches(account['$id']).subscribe((matches) => {
        this.potentialMatches = matches.map(x => {
          return {
            avatarUrl: this.appwriteService.storage.getFilePreview('64693ceeed255ec7abf9', x['avatarUrl']).href,
            displayName: x["displayName"],
            age: x["birthday"],
            location: x["location"],
            id: x.$id,
            target: x["target"],
            longestRun: x["longestRun"],
            currentPace: x["currentPace"],
          }
        });
        this.currentMatch = this.potentialMatches.pop() || null;
        this.isLoaded = true;
        this.cdr.detectChanges();
      }
      );
    });
  }
  setMatch(matchId: string, isMatch: boolean) {
    this.isMatching = true;
    this.userService.getAccount().then((account) => {
      this.likesService.like(matchId, account['$id'], isMatch)
        .then(() => {
          this.currentMatch = this.potentialMatches.pop() || null;
          if (isMatch) {
            this.alertService.success('It\'s a match!');
          }
          this.isMatching = false;
          this.cdr.detectChanges();
        })
        .catch(() => {
          this.isMatching = false;
          this.alertService.error('Something went wrong!')
        })
    })
  }
}
