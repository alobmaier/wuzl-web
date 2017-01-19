import { NotificationsService } from 'angular2-notifications';
import { PlayerService } from '../shared/services/player.service';
import { AuthService } from '../shared/services/auth.service';
import { MatchService } from '../shared/services/match.service';
import { MatchDto, PlayerDto } from '../shared/models/models';
import { Component, OnInit } from '@angular/core';

declare var $ : any;

@Component({
  selector: 'app-my-matches',
  templateUrl: './my-matches.component.html',
  styleUrls: ['./my-matches.component.css']
})
export class MyMatchesComponent implements OnInit {

  private matches : MatchDto[] = [];
  private loaded : boolean = false;

  constructor(private authService : AuthService, 
              private playerService : PlayerService,
              private matchService : MatchService,
              private notificationService : NotificationsService) { }

  ngOnInit() {
    let player : PlayerDto;

    let username = this.authService.getCurrentUserName();

    this.playerService.getByUserName(username)
      .subscribe(
        res => player = res,
        error => this.notificationService.error("Error", error),
        () => {
          // get matches of player
          console.log(player);
          this.getMatches(player.id);
        }
    );

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

  addGoalTeam1() {

  }

  addGoalTeam2() {

  }

}
