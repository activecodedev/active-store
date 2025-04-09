import { Routes } from '@angular/router';
import { AppLayout } from '@/layout/components/app.layout';

export const routes: Routes = [
  {
    path: '',
    component: AppLayout,
    children: [
      {
        path: '',
        data: { breadcrumb: 'E-Commerce Dashboard' },
        loadComponent: () =>
          import('./pages/dashboard/ecommercedashboard').then(
            (c) => c.EcommerceDashboard
          ),
      },
      {
        path: 'dashboard-banking',
        data: { breadcrumb: 'Banking Dashboard' },
        loadComponent: () =>
          import('./pages/dashboard/bankingdashboard').then(
            (c) => c.BankingDashboard
          ),
      },
      // {
      //   path: 'uikit',
      //   data: { breadcrumb: 'UI Kit' },
      //   loadChildren: () => import('./pages/uikit/uikit.routes'),
      // },
      // {
      //   path: 'documentation',
      //   data: { breadcrumb: 'Documentation' },
      //   loadComponent: () =>
      //     import('./pages/documentation/documentation').then(
      //       (c) => c.Documentation
      //     ),
      // },
      // {
      //   path: 'pages',
      //   data: { breadcrumb: 'Pages' },
      //   loadChildren: () => import('./pages/pages.routes'),
      // },
      // {
      //   path: 'apps',
      //   data: { breadcrumb: 'Apps' },
      //   loadChildren: () => import('./apps/apps.routes'),
      // },
      // {
      //   path: 'ecommerce',
      //   loadChildren: () => import('./pages/ecommerce/ecommerce.routes'),
      // },
      // {
      //   path: 'profile',
      //   data: { breadcrumb: 'User Management' },
      //   loadChildren: () =>
      //     import('@/pages/usermanagement/usermanagement.routes'),
      // },
      // {
      //   path: 'blocks',
      //   data: { breadcrumb: 'Prime Blocks' },
      //   loadChildren: () => import('@/pages/blocks/blocks.routes'),
      // },
    ],
  },
  { path: 'auth', loadChildren: () => import('./pages/auth/auth.routes') },
  {
    path: 'landing',
    loadComponent: () =>
      import('./pages/landing/landing').then((c) => c.Landing),
  },
  {
    path: 'notfound',
    loadComponent: () =>
      import('./pages/notfound/notfound').then((c) => c.Notfound),
  },
  { path: '**', redirectTo: '/notfound' },
];
