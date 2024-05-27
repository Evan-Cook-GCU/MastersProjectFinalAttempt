import { Routes } from '@angular/router';

export const layoutRoutes: Routes = [
  {
    path: 'layout-1',
    loadComponent: () => import('./layout1/layout1.component').then(c => c.Layout1Component)
  },
  {
    path: 'layout-2',
    loadComponent: () => import('./layout2/layout2.component').then(c => c.Layout2Component)
  },
  {
    path: 'layout-3',
    loadComponent: () => import('./layout3/layout3.component').then(c => c.Layout3Component)
  },
  {
    path: 'layout-4',
    loadComponent: () => import('./layout4/layout4.component').then(c => c.Layout4Component)
  },
  {
    path: 'reactive-form',
    loadComponent: () => import('../reactive-form/reactive-form.component').then(c => c.ReactiveFormComponent)
  }
]

