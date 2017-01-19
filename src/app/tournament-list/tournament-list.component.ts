import { AuthService } from '../shared/services/auth.service';
import { NotificationsService } from 'angular2-notifications';
import { TournamentDto } from '../shared/models/models';
import { TournamentService } from '../shared/services/tournament.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.css']
})
export class TournamentListComponent implements OnInit {

  private tournaments : TournamentDto[] = [];
  private loaded : boolean = false;
  constructor(private tournamentService : TournamentService,
              private authService : AuthService,
              private notificationService : NotificationsService) { }

  ngOnInit() {
    this.tournamentService.getAllTournaments()
      .subscribe(
        res => this.tournaments = res,
        error => this.notificationService.error("Error", error),
        () => this.loaded = true
      )
  }

}
