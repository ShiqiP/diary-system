import { Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
];
