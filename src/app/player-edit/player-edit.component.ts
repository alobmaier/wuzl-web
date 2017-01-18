import { environment } from '../../environments/environment';
import { ActivatedRoute, Route } from '@angular/router';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { RoleService } from '../shared/services/role.service';
import { PlayerService } from '../shared/services/player.service';

import { Role } from '../shared/models/Role';
import { Player } from '../shared/models/Player';
import { AttendanceEnum } from '../shared/models/Player';
import { PlayerDto } from '../shared/models/PlayerDto';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.css']
})
export class PlayerEditComponent implements OnInit {

  private model : Player = new Player();
  private attendanceEnum = AttendanceEnum;
  private id : number;

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
              private route : ActivatedRoute,
              private notificationService : NotificationsService) { 

    this.id = route.snapshot.params['id'];
  }

  ngOnInit() {
    console.log(this.id);

    this.roleService.getAllRoles()
      .subscribe(
        res => this.roles = res,
        error => this.notificationService.error("Server error", error)
      );

    this.playerService.getById(this.id)
      .subscribe(
        res => this.model = res.player,
        error => this.notificationService.error("Error", error),
        () =>{
          // update img src
          this.previewImgUrl = new URL(environment.baseURL + this.model.picturePath);
        }
      );
  }

  updatePlayer() {
    this.playerService.updatePlayer(this.model.id, this.model)
      .subscribe(
        res => {
          console.log(res);
        },
        error => this.notificationService.error("Error", error),
        () =>{
          // todo: send post request to upload picture
          console.log(this.model.id);
          this.playerService.uploadProfilePic(this.model.id,this.file);
        }
      )
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
