import { Observable } from 'rxjs/Rx';
import { ObservableInput } from 'rxjs/Observable';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TournamentDto } from '../shared/models/TournamentDto';
import { TournamentService } from '../shared/services/tournament.service';
import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit, OnDestroy {

  private currentTournament : TournamentDto = new TournamentDto;
  private subscription : Subscription;

  constructor(private tournamentService : TournamentService) { }

  ngOnInit() {
    let timer = TimerObservable.create(0, 3000); // every 3 seconds
    this.subscription = timer.subscribe(
      t => this.pollMatches()
    );
  }

  pollMatches() {
    this.tournamentService.getCurrentTournament()
      .subscribe(res => {
        this.currentTournament = res;
        console.log(this.currentTournament);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
