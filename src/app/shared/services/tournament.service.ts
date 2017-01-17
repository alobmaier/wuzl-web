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
}