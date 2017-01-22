import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/Rx';
import { Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Match } from '../models/Match';
import { MatchDto } from '../models/MatchDto';

import { environment } from '../../../environments/environment';
@Injectable()
export class MatchService {

  private defaultHeaders : Headers = new Headers();
  constructor(private authHttp : HttpService) { 
    this.defaultHeaders.append("Content-Type", "application/json");
  }

  updateMatch(match : Match) : Observable<boolean> {
    return this.authHttp.put('/match/' + match.id, match, {headers: this.defaultHeaders})
      .map(res => <boolean>res.json());
  }

  getMatchesByPlayer(playerId : number) {
    return this.authHttp.get(`/match/findbyplayer/${playerId}`)
      .map(res => <MatchDto[]>res.json());
  }

}
