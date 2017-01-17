import { Component, OnInit } from '@angular/core';
import { TournamentDto } from '../shared/models/TournamentDto';
import { TournamentService } from '../shared/services/tournament.service';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {

  private currentTournament : TournamentDto = new TournamentDto;
  constructor(private tournamentService : TournamentService) { }

  ngOnInit() {
    this.tournamentService.getCurrentTournament()
      .subscribe(res => {
        this.currentTournament = res;
        console.log(this.currentTournament);
      });
  }

}
