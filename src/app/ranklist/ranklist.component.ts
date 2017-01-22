import { CurrentStrength } from '../shared/models/models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlayerDto } from '../shared/models/PlayerDto';
import { PlayerService } from '../shared/services/player.service';
import { NotificationsService } from 'angular2-notifications';
import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";

@Component({
  selector: 'app-ranklist',
  templateUrl: './ranklist.component.html',
  styleUrls: ['./ranklist.component.css']
})
export class RanklistComponent implements OnInit, OnDestroy {

  private players : PlayerDto[] = [];
  private loaded : boolean = false;
  private subscription : Subscription;
  constructor(private playerService : PlayerService,
              private notificationService : NotificationsService) { }
  ngOnInit() {

    let timer = TimerObservable.create(0, 6000); // every 5 seconds, ranklist is not too important to be up-to-date
    this.subscription = timer.subscribe(
      t => this.pollRanklist()
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  compare(a : PlayerDto, b : PlayerDto) {
    if (a.strength.strength < b.strength.strength)
      return 1;
    if (a.strength.strength > b.strength.strength)
      return -1;
      
    return 0;
  }

  pollRanklist() {
    this.playerService.getAllPlayers()
      .subscribe(
        res => this.players = res,
        error => this.notificationService.error("Error", "Ranklist cannot be fetched."),
        () =>{
          this.players.forEach(p =>{
            if(!p.strength) {
              p.strength = new CurrentStrength();
              p.strength.strength = 0;
            }
          });
          this.players.sort(this.compare);
          this.loaded = true;
        } 
      );
  }

}
