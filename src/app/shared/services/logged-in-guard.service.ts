import { Injectable } from '@angular/core';
import { AuthService } from "./auth.service";
import { Router, CanActivate } from "@angular/router";

@Injectable()
export class LoggedInGuardService implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate() {
    if (this.authService.loggedIn()) {
      return true;
    }

    this.router.navigate(['/login']); // not logged in so redirect to login page
    return false;
  }
}
