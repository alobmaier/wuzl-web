import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/Rx';
import { Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Player } from '../models/Player';
import { PlayerDto } from '../models/PlayerDto';
import { environment } from '../../../environments/environment';

@Injectable()
export class PlayerService {

  private defaultHeaders : Headers = new Headers();
  constructor(private authHttp : HttpService) { 
    this.defaultHeaders.append("Content-Type", "application/json");
  }

  getAllPlayers() : Observable<PlayerDto[]> {
    return this.authHttp.get('/player')
      .map(res => <PlayerDto[]>res.json());
  }

  getById(id : number) : Observable<PlayerDto> {
    return this.authHttp.get('/player/' + id)
      .map(res => <PlayerDto>res.json());
  }
  getByUserName(username : string) : Observable<PlayerDto> {
    return this.authHttp.get(`/player/findbyusername/${username}`)
      .map(res => <PlayerDto>res.json());
  }
  createPlayer(player : Player) : Observable<PlayerDto>{
    return this.authHttp.post('/player', JSON.stringify(player), {headers: this.defaultHeaders})
      .map(res => <PlayerDto>res.json());
  }
  updatePlayer(playerId : number, player : Player) : Observable<boolean> {
    return this.authHttp.put(`/player/${playerId}`, JSON.stringify(player), {headers: this.defaultHeaders})
      .map(res => <boolean>res.json());
  }
  uploadProfilePic(playerId : number, file : File) {
    let formData: FormData = new FormData(),
            xhr: XMLHttpRequest = new XMLHttpRequest();

    formData.append("file", file);

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
          if (xhr.status === 200) {
              console.log(JSON.parse(xhr.response));
          } else {
              console.log(JSON.parse(xhr.response));
          }
      }
    };

    xhr.open('POST', environment.apiURL + `/player/${playerId}/profilepic`, true);
    xhr.send(formData);
  }

  deletePlayer(playerId : number) : Observable<Response> {
    return this.authHttp.delete(`/player/${playerId}`);
  }

}
