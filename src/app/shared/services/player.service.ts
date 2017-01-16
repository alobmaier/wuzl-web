import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';

import { Player } from '../models/Player';
import { PlayerDto } from '../models/PlayerDto';

@Injectable()
export class PlayerService {

  constructor(private authHttp : HttpService) { 

  }

  getAllPlayers() : Observable<PlayerDto[]> {
    return this.authHttp.get('/player')
      .map(res => <PlayerDto[]>res.json());
  }

  getById(id : number) : Observable<PlayerDto> {
    return this.authHttp.get('/player/' + id)
      .map(res => <PlayerDto>res.json());
  }
  createPlayer(player : Player) : Observable<any>{
    return this.authHttp.post('/player', JSON.stringify(player));
  }

}
