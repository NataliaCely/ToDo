import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { Routing } from '../../../pages/routing';

export const routes: Routes = [
  { path: '', component: LayoutComponent, children: Routing}
];
