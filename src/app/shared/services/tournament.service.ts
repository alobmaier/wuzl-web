import { MatchDto, Tournament } from '../models/models';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/Rx';
import { Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { TournamentDto } from '../models/TournamentDto';

import { environment } from '../../../environments/environment';

@Injectable()
export class TournamentService {

  private defaultHeaders : Headers = new Headers();
  constructor(private authHttp : HttpService) { 
    this.defaultHeaders.append("Content-Type", "application/json");
  }

  getAllTournaments() : Observable<TournamentDto[]> {
    return this.authHttp.get('/tournament')
      .map(res => <TournamentDto[]>res.json());
  }
  getCurrentTournament() : Observable<TournamentDto> {
    console.log("in here");
    return this.authHttp.get('/tournament/findbydate/' + new Date().toDateString())
      .map(res => <TournamentDto>res.json());
  }
  getById(tournamentId : number) : Observable<TournamentDto> {
    return this.authHttp.get(`/tournament/${tournamentId}`)
      .map(res => <TournamentDto>res.json());
  }
  
  createTournament(tournament : Tournament) {
    return this.authHttp.post('/tournament', JSON.stringify(tournament), {headers : this.defaultHeaders})
      .map(res => <TournamentDto>res.json());
  }

  addPlayers(tournamentId : number, players : number[]) : Observable<boolean>{
    return this.authHttp.post(`/tournament/${tournamentId}/insertplayers`, JSON.stringify(players), {headers : this.defaultHeaders})
      .map(res => <boolean>res.json());
  }
  createMatches(id : number, numberOfMatches : number) : Observable<MatchDto>{
    return this.authHttp.get(`/tournament/${id}/creatematches/${numberOfMatches}`)
      .map(res => <MatchDto>res.json());
  }
}
