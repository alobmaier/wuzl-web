import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { LoggedInGuardService } from "./shared/services/logged-in-guard.service";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
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