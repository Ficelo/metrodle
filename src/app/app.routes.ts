import { Routes } from '@angular/router';
import { MetroPage } from './pages/metro-page/metro-page';
import { RerPage } from './pages/rer-page/rer-page';

export const routes: Routes = [
    {
        path: '', // TODO : change to metro when home page is done
        component: MetroPage
    },
    {
        path: 'rer',
        component: RerPage
    }
];
