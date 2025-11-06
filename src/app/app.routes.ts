import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/layout/page-not-found/page-not-found';

export const routes: Routes = [
    { 
        path: '', 
        loadChildren: () => import('./domains/home/home.routes').then(m => m.homeRoutes)
    },
    { 
        path: 'auth', 
        loadChildren: () => import('./domains/auth/auth.routes').then(m => m.authRoutes)
    },
    
    { path: '**', component: PageNotFoundComponent },
];