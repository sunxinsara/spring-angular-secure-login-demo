
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { HomeTestComponent } from './pages/home/home-test.component';
import { SurveyComponent } from './pages/survey/survey.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'home-test', component: HomeTestComponent },
  { path: 'survey', component: SurveyComponent },
  { path: '**', redirectTo: 'login' }
];