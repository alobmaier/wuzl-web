import { Component, OnInit } from '@angular/core';
import { PlayerDto } from '../shared/models/PlayerDto';

import { Player } from '../shared/models/Player';
import { PlayerService } from '../shared/services/player.service';
import { NotificationsService } from "angular2-notifications";
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  public players : Array<PlayerDto> = [];
  constructor(private playerService : PlayerService, private notificationService : NotificationsService, private authService : AuthService) { }

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

  deleteUser(dto : PlayerDto) {
    this.playerService.deletePlayer(dto.id).subscribe(
      res => this.notificationService.info("Deleted", `Player ${dto.player.userName} was deleted successfully.`),
      error => this.notificationService.error('Error', error),
      () => {
        let index = this.players.indexOf(dto);
        this.players.splice(index, 1);
        console.log(this.players);
      }
      
    );
  }

}
