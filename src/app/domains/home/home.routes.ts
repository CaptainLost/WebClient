import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { authGuard } from '../auth/guards/auth.guard';

export const homeRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [authGuard] },
];
