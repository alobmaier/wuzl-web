import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { SimpleNotificationsModule } from "angular2-notifications";
import { WuhuRoutingModule } from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { AuthService } from "./shared/services/auth.service";
import { HttpService } from "./shared/services/http.service";

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';


export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: ' ',
    //globalHeaders: [{'Content-Type':'application/json'}],
    noJwtError: true
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    DashboardComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    SimpleNotificationsModule,
    WuhuRoutingModule
  ],
  providers: [    
    AuthService,
    HttpService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
