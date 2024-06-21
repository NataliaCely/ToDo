import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./task/task.component').then((m) => m.TaskComponent),
  }
]

export { Routing};
