import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';

import { PlayerDto } from '../models/PlayerDto';

@Injectable()
export class PlayerService {

  constructor(private authHttp : HttpService) { 

  }

  getAllPlayers() : Observable<PlayerDto[]> {
    console.log("testsfg");
    return this.authHttp.get('/player')
      .map(res => <PlayerDto[]>res.json());
  }

  getById(id : number) : Observable<PlayerDto> {
    return this.authHttp.get('/player/' + id)
      .map(res => <PlayerDto>res.json());
  }

}
