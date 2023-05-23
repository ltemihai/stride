import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {TuiButtonModule} from "@taiga-ui/core";
import {UserService} from "../../services/user.service";
import {LikesService} from "../../services/likes.service";
import {AlertService} from "../../services/alert.service";
import {AppwriteService} from "../../services/appwrite.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TuiButtonModule, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  protected potentialMatches: {
    avatarUrl: string,
    displayName: string,
    age: number,
    location: string,
    id: string
  }[] = [];

  protected currentMatch: {
    avatarUrl: string,
    displayName: string,
    age: number,
    location: string,
    id: string
  } | null = null;

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
      this.likesService.getPotentialMatches(account['$id']).then((matches) => {
        this.potentialMatches = matches.documents.map(x => {
          return {
            avatarUrl: this.appwriteService.storage.getFilePreview('64693ceeed255ec7abf9', x['avatarUrl']).href,
            displayName: x["displayName"],
            age: x["birthday"],
            location: x["location"],
            id: x.$id
          }
        });
        this.currentMatch = this.potentialMatches[0];
        this.cdr.detectChanges();
      }
      );
    });
  }
  setMatch(matchId: string = '646276710b89412e917e', isMatch: boolean) {
    this.userService.getAccount().then((account) => {
      this.likesService.like(matchId, account['$id'], isMatch)
        .then(() => this.alertService.success('It\'s a match!'))
        .catch(() => this.alertService.error('Something went wrong!'))
    })
  }
}
