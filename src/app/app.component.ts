import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { NotificationsService } from 'angular2-notifications';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  options: any = {
    timeOut: 10000,
    preventDuplicates: true
  };

  constructor(public router: Router, private notificationService : NotificationsService) {
  }
}
