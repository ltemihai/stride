import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../guards/auth.guard";
import {ProfileComponent} from "../pages/profile/profile.component";

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('../pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('../pages/home/home.component').then(m => m.HomeComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'matches',
    loadComponent: () => import('../pages/matches/matches.component').then(m => m.MatchesComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadComponent: () => import('../pages/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
