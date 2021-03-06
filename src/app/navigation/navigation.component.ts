import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../shared/services/auth.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  isNavCollapsed : boolean = true;

  constructor(private router: Router,
              private authService: AuthService) {
  }
}
