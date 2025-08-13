import { Routes } from '@angular/router';
import { AppLayout } from './layout/components/layout';

export const routes: Routes = [
   {
        path: '',
        component: AppLayout,
        children: [
        ]
    },
];
