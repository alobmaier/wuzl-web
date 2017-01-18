import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpService } from "./http.service";
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { NotificationsService } from "angular2-notifications"
import { URLSearchParams, Headers } from '@angular/http';

@Injectable()
export class AuthService {

  private jwtHelper = new JwtHelper();

  constructor(public authHttp: HttpService,
              public router: Router,
              public notificationService: NotificationsService) {
  }

  private saveJwt(token): void {
    if (token) {
      localStorage.setItem('id_token', token);
    }
  }

  public isAdmin(): boolean {
    const token = localStorage.getItem('id_token');
    return token ? this.jwtHelper.decodeToken(token).role === 'Administrator' : false;
  }

  public login(username: string, password: string) {
    console.log("in login", username, password);
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('username', username);
    urlSearchParams.append('password', password);
    let body = urlSearchParams.toString();

    this.authHttp.post('/login', body, {headers: headers})
      .subscribe(response => {
          console.log(response.json());
          this.saveJwt(response.json().access_token);

          this.router.navigate(['/dashboard']);
        },
        error => {
          this.notificationService.error("Login Error", "Wrong Username or Password");
        });
  }

  public loggedIn() {
    return tokenNotExpired();
  }

  public logout() {
    localStorage.removeItem('id_token');
    this.router.navigate(['/login']);
  }

  public getCurrentUserName(): string {
    const token = localStorage.getItem('id_token');
    return this.jwtHelper.decodeToken(token).sub;
  }
}
