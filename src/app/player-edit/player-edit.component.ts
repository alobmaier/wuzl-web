import { environment } from '../../environments/environment';
import { ActivatedRoute, Route, Router } from '@angular/router';
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
              private router : Router,
              private route : ActivatedRoute,
              private notificationService : NotificationsService) { 

    this.id = route.snapshot.params['id'];
  }

  ngOnInit() {

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
          
        },
        error => this.notificationService.error("Error", error),
        () =>{
          // todo: send post request to upload picture
          this.playerService.uploadProfilePic(this.model.id,this.file);
          this.notificationService.success("Success", "Successfully updated player.");

          this.router.navigate(['/players']);
        }
      )
  }

  updateAttendance(event) {
    if(event.target.checked) {
      this.model.attendance = (<number>this.model.attendance) + +event.target.value;
    }
    else {
      this.model.attendance = (<number>this.model.attendance) - +event.target.value;
    }
  }
  onImageChanged(event) {
    this.file = event.srcElement.files[0];

    var reader = new FileReader();

    reader.onload = () => {
      this.previewImgUrl = reader.result;
    };

    reader.readAsDataURL(event.target.files[0]);

  }
}
