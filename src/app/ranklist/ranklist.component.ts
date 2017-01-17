import { Component, OnInit } from '@angular/core';
import { PlayerDto } from '../shared/models/PlayerDto';
import { PlayerService } from '../shared/services/player.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-ranklist',
  templateUrl: './ranklist.component.html',
  styleUrls: ['./ranklist.component.css']
})
export class RanklistComponent implements OnInit {

  private players : PlayerDto[] = [];
  constructor(private playerService : PlayerService,
              private notificationService : NotificationsService) { }
  ngOnInit() {
    this.playerService.getAllPlayers()
      .subscribe(
        res => this.players = res,
        error => this.notificationService.error("Error", error),
        () => this.players.sort(this.compare)
      )
  }

  compare(a : PlayerDto, b : PlayerDto) {
    if (a.strength.strength < b.strength.strength)
      return 1;
    if (a.strength.strength > b.strength.strength)
      return -1;
      
    return 0;
  }

}
