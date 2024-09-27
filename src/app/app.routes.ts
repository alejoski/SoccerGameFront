import { Routes } from '@angular/router';
import { TeamCharacteristicsComponent } from './components/team-characteristics/team-characteristics.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'team-char', component: TeamCharacteristicsComponent },
  //{ path: 'team-char', component: TeamCharacteristicsComponent },
  { path: '**', redirectTo:'', pathMatch:'full'}

];
