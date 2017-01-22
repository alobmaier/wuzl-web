import { Subscription } from 'rxjs/Rx';
import { NotificationsService } from 'angular2-notifications';
import { PlayerService } from '../shared/services/player.service';
import { AuthService } from '../shared/services/auth.service';
import { MatchService } from '../shared/services/match.service';
import { Match, MatchDto, PlayerDto } from '../shared/models/models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { TimerObservable } from "rxjs/observable/TimerObservable";

@Component({
  selector: 'app-my-matches',
  templateUrl: './my-matches.component.html',
  styleUrls: ['./my-matches.component.css']
})
export class MyMatchesComponent implements OnInit, OnDestroy {

  private matches : MatchDto[] = [];
  private loaded : boolean = false;
  private player : PlayerDto;

  private subscription : Subscription;
  private timer : Observable<number>;

  constructor(private authService : AuthService, 
              private playerService : PlayerService,
              private matchService : MatchService,
              private notificationService : NotificationsService) { }

  ngOnInit() {
    this.timer = TimerObservable.create(0, 2000); // every 2 seconds

    let username = this.authService.getCurrentUserName();

    this.playerService.getByUserName(username)
      .subscribe(
        res => this.player = res,
        error => this.notificationService.error("Error", error),
        () => {
          // get matches of player

          this.subscription = this.timer.subscribe(
            t => this.getMatches(this.player.id)
          );
        }
    );

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getMatches(playerId : number) {
    this.matchService.getMatchesByPlayer(playerId)
      .subscribe(
        res => this.matches = res,
        error => this.notificationService.error("Error", error),
        () => {
          console.log(this.matches);
          this.loaded = true;
        }
    );
  }

  addGoalTeam1(match : Match) {
    // stop subscribing from pollling
    this.subscription.unsubscribe();

    match.goalsTeam1++;

    this.matchService.updateMatch(match)
      .subscribe(
        res => console.log(res),
        error => {
          this.notificationService.error("Error", "Match was not updated!");
          // revert changes
          match.goalsTeam1--;
        }
    );

    this.subscription = this.timer.subscribe(
      t => this.getMatches(this.player.id)
    );
  }

  addGoalTeam2(match : Match) {
    this.subscription.unsubscribe();
    
    match.goalsTeam2++;

    this.matchService.updateMatch(match)
      .subscribe(
        res => console.log(res),
        error => {
          this.notificationService.error("Error", "Match was not updated!");
          // revert changes
          match.goalsTeam2--;
        }
    );

    this.subscription = this.timer.subscribe(
      t => this.getMatches(this.player.id)
    );
  }

}
