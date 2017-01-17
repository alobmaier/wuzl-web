import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { RoleService } from '../shared/services/role.service';
import { PlayerService } from '../shared/services/player.service';

import { Role } from '../shared/models/Role';
import { Player } from '../shared/models/Player';
import { AttendanceEnum } from '../shared/models/Player';
import { PlayerDto } from '../shared/models/PlayerDto';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent implements OnInit {

  private model : Player = new Player();
  private attendanceEnum = AttendanceEnum;

  private previewImgUrl : URL;
  private file : File;

  private isMonday : boolean;
  private isTuesday : boolean;
  private isWednesday : boolean;
  private isThursday : boolean;
  private isFriday : boolean;
  private isSaturday : boolean;
  private isSunday : boolean;

  private roles : Role[] = [];

  
  constructor(private roleService : RoleService,
              private playerService : PlayerService,
              private notificationService : NotificationsService) { 
              
  }

  ngOnInit() {
    this.roleService.getAllRoles()
      .subscribe(
        res => this.roles = res,
        error => this.notificationService.error("Server error", error)
      );
  }

  createPlayer() {
    let player : PlayerDto;
    this.playerService.createPlayer(this.model)
      .subscribe(
        res => {
          console.log(res);
          player = res;
        },
        error => this.notificationService.error("Error", error),
        () =>{
          // todo: send post request to upload picture
          this.playerService.uploadProfilePic(player.id,this.file);
        }
      )
  }
  uploadProfilePicture(playerId : number) {
    console.log("test upload for id ", playerId);
  }

  updateAttendance(event) {
    if(event.target.checked) {
      console.log(event.target.value);
      this.model.attendance = (<number>this.model.attendance) + +event.target.value;
    }
    else {
      this.model.attendance = (<number>this.model.attendance) - +event.target.value;
    }
  }
  onImageChanged(event) {
    this.file = event.srcElement.files[0];
    console.log(this.file);

    var reader = new FileReader();

    reader.onload = () => {
      this.previewImgUrl = reader.result;
    };

    reader.readAsDataURL(event.target.files[0]);

  }
}
