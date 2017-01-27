import { MatchService } from './shared/services/match.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { SimpleNotificationsModule } from "angular2-notifications";
import { WuhuRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartModule } from 'angular2-highcharts';

import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { AuthService } from "./shared/services/auth.service";
import { HttpService } from "./shared/services/http.service";
import { PlayerService } from './shared/services/player.service';
import { RoleService } from './shared/services/role.service';
import { TournamentService } from './shared/services/tournament.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { AttendancePipe } from './shared/pipes/attendance.pipe';
import { PlayerFormComponent } from './player-form/player-form.component';
import { RanklistComponent } from './ranklist/ranklist.component';
import { MatchListComponent } from './match-list/match-list.component';
import { TournamentListComponent } from './tournament-list/tournament-list.component';
import { TournamentDetailsComponent } from './tournament-details/tournament-details.component';
import { TournamentFormComponent } from './tournament-form/tournament-form.component';
import { MyMatchesComponent } from './my-matches/my-matches.component';
import { PlayerEditComponent } from './player-edit/player-edit.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { StatisticsComponent } from './statistics/statistics.component';


export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: 'Bearer ',
    //globalHeaders: [{'Content-Type':'application/json'}],
    noJwtError: true
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    DashboardComponent,
    PlayerListComponent,
    PlayerDetailsComponent,
    AttendancePipe,
    PlayerFormComponent,
    RanklistComponent,
    MatchListComponent,
    TournamentListComponent,
    TournamentDetailsComponent,
    TournamentFormComponent,
    MyMatchesComponent,
    PlayerEditComponent,
    LoadingSpinnerComponent,
    StatisticsComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    SimpleNotificationsModule,
    ChartModule,
    WuhuRoutingModule
  ],
  providers: [    
    AuthService,
    HttpService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    PlayerService,
    RoleService,
    TournamentService,
    MatchService
    ],
  bootstrap: [AppComponent]
})

export class AppModule { }
