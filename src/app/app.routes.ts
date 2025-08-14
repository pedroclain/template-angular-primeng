import { Routes } from '@angular/router';
import { AppLayout } from './layout/components/layout';
import { Home } from './pages/home/home';

export const routes: Routes = [
   {
        path: '',
        component: AppLayout,
        children: [{
          component: Home,
          path: ''
        }]
    },
];
