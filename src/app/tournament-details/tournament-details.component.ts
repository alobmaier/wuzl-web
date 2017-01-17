import { AuthService } from '../shared/services/auth.service';
import { MatchService } from '../shared/services/match.service';
import { TournamentService } from '../shared/services/tournament.service';
import { Match, TournamentDto } from '../shared/models/models';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-tournament-details',
  templateUrl: './tournament-details.component.html',
  styleUrls: ['./tournament-details.component.css']
})
export class TournamentDetailsComponent implements OnInit {

  private dto : TournamentDto;
  private id : number;
  private loaded : boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationsService,
              private tournamentService : TournamentService,
              private matchService : MatchService,
              private authService : AuthService) { 
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.tournamentService.getById(this.id)
      .subscribe(
        res => this.dto = res,
        error => this.notificationService.error("Error", error),
        () => this.loaded = true
      );
  }

  saveResult(match : Match) {
    console.log("halllo");
    this.matchService.updateMatch(match)
      .subscribe(
        res => this.notificationService.success("Updated match", "Updated match successfully!"),
        error => this.notificationService.error("Error", error)
      );
  }
  endMatch(match : Match) {
    console.log("halloo");
    match.hasEnded = true;
    this.matchService.updateMatch(match)
      .subscribe(
        res => this.notificationService.success("End match", "Ended match successfully!"),
        error => this.notificationService.error("Error", error)
      );
  }

}
