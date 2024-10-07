import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { authenticatedGuard } from './core/guards/authenticated.guard';

  // { path: '', component: HomeComponent },
  // { path: 'team-char', component: TeamCharacteristicsComponent },
  // //{ path: 'team-char', component: TeamCharacteristicsComponent },
  //

export const routes: Routes = [
  {
    path: 'main',
    loadComponent: () => import('./components/shared/layout/layout.component'),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./components/home/home.component').then(
            (m) => m.HomeComponent
          ),
        canActivate: [authGuard],
      },
      {
        path: 'team-char',
        loadComponent: () =>
          import(
            './components/business/caracteristicas-equipo/caracteristicas-equipo.component'
          ),
        canActivate: [authGuard],
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'new-user',
    loadComponent: () => import('./components/business/new-user-register/new-user-register.component')
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component'),
    canActivate: [authenticatedGuard],
  },
  { path: '**', redirectTo: 'login' },
];
