import { Component, OnInit } from '@angular/core';
import { PlayerDto } from '../shared/models/PlayerDto';

import { PlayerService } from '../shared/services/player.service';
import { NotificationsService } from "angular2-notifications";

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  public players : Array<PlayerDto> = [];
  constructor(private playerService : PlayerService, private notificationService : NotificationsService) { }

  ngOnInit() {
    this.playerService.getAllPlayers()
      .subscribe(
        res => {
          this.players = res;
          console.log(res);
        },
        error => {
          this.notificationService.error("Server Error", "Could not get players");
        }
      );
  }

}
