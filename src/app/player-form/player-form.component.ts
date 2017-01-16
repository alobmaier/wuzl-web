import { Component, OnInit, ViewChild } from '@angular/core';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { RoleService } from '../shared/services/role.service';
import { PlayerService } from '../shared/services/player.service';

import { Role } from '../shared/models/Role';
import { Player } from '../shared/models/Player';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent implements OnInit {

  @ViewChild(FileUploadComponent)
  private fileUploadComponent: FileUploadComponent;

  private model : Player = new Player();

  private roles : Role[] = [];

  constructor(private roleService : RoleService,
              private playerService : PlayerService,
              private notificationService : NotificationsService) { }

  ngOnInit() {
    this.roleService.getAllRoles()
      .subscribe(
        res => this.roles = res,
        error => this.notificationService.error("Server error", error)
      )
  }

  createPlayer() {
    this.playerService.createPlayer(this.model)
      .subscribe(
        res => console.log(res),
        error => this.notificationService.error("Error", error)
      )
  }

}
