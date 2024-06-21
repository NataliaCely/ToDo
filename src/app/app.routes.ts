import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'main',
    loadChildren: () =>
      import('./shared/components/layout/layout.routes').then((m) => m.routes)
  },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: '**', redirectTo: 'main', pathMatch: 'full' },
];
