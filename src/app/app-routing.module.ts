import { TournamentDetailsComponent } from './tournament-details/tournament-details.component';
import { TournamentFormComponent } from './tournament-form/tournament-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { AdminComponent } from './admin/admin.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { PlayerFormComponent } from './player-form/player-form.component';
import { TournamentListComponent } from './tournament-list/tournament-list.component';
import { LoggedInGuardService } from "./shared/services/logged-in-guard.service";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    // is public for everyone
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'players',
    component: PlayerListComponent,
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'players/add',
    component: PlayerFormComponent,
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'players/details/:id',
    component: PlayerDetailsComponent,
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'tournaments',
    component: TournamentListComponent,
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'tournaments/add',
    component: TournamentFormComponent,
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'tournaments/details/:id',
    component: TournamentDetailsComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [LoggedInGuardService]
})
export class WuhuRoutingModule {
}