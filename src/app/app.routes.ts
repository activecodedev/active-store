import { Routes } from '@angular/router';
import { AppLayout } from '@/layout/components/app.layout';

export const routes: Routes = [
  {
    path: '',
    component: AppLayout,
    children: [
      {
        path: '',
        data: { breadcrumb: '' },
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
      },
    ],
  },
  { path: 'auth', loadChildren: () => import('./pages/auth/auth.routes') },
  {
    path: 'notfound',
    loadComponent: () =>
      import('./pages/notfound/notfound').then((c) => c.Notfound),
  },
  { path: '**', redirectTo: '/notfound' },
];
