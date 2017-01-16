import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService) {
  }

  ngOnInit() {
  }

  login(event, username, password) {
    event.preventDefault();
    console.log(username, password);
    this.auth.login(username, password);
  }
}
