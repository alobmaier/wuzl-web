import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { PlayerService } from '../shared/services/player.service';
import { PlayerDto } from '../shared/models/PlayerDto';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {

  private id : number;
  private dto : PlayerDto;
  private loaded: boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationsService,
              private playerService : PlayerService) { 
    this.id = route.snapshot.params['id'];
  }

  ngOnInit() {
    // get player
    this.playerService.getById(this.id)
        .subscribe(
          res => {
            this.dto = res;          
            this.loaded = true;
            if(this.dto.player.picturePath)
              this.dto.player.picturePath = environment.baseURL + this.dto.player.picturePath;
}         ,
          error => this.notificationService.error("Server error", error.json().msg)
        )
  }

}
