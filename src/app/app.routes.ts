import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/user/auth/login/login';
import { PageNotFound } from './components/page-not-found/page-not-found';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'user/login', component: Login },
    
    { path: '**', component: PageNotFound },
];