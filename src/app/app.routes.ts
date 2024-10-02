import { Routes } from '@angular/router';

  // { path: '', component: HomeComponent },
  // { path: 'team-char', component: TeamCharacteristicsComponent },
  // //{ path: 'team-char', component: TeamCharacteristicsComponent },
  //

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/shared/layout/layout.component'),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./components/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'team-char',
        loadComponent: () =>
          import(
            './components/business/caracteristicas-equipo/caracteristicas-equipo.component'
          ),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component'),
  },
  { path: '**', redirectTo: 'home' },
];
