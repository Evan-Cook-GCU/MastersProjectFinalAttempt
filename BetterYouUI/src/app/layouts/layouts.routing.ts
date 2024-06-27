import { Routes } from '@angular/router';
import { AdminGroupEditorComponent } from './admin-group-editor/admin-group-editor.component';
import { GroupSearchComponent } from './group-search/group-search.component';
import { UserGroupViewComponent } from './user-group-view/user-group-view.component';

export const layoutRoutes: Routes = [
  {
    path: 'layout-1',
    loadComponent: () => import('./layout1/layout1.component').then(c => c.Layout1Component)
  },
  {
    path: 'admin-group-editor/:groupId',
    loadComponent: () => import('./admin-group-editor/admin-group-editor.component').then(c => c.AdminGroupEditorComponent)
  },
  {
    path: 'user-group-view',
    loadComponent: () => import('./user-group-view/user-group-view.component').then(c => c.UserGroupViewComponent)
  },
  {
    path: 'user-home-page',
    loadComponent: () => import('./user-home-page/user-home-page.component').then(c => c.UserHomePageComponent)
  },
  {
    path: 'group-search',
    loadComponent: () => import('./group-search/group-search.component').then(c => c.GroupSearchComponent)
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
  },{
    path: 'group-search',
    loadComponent: () => import('./group-search/group-search.component').then(c => c.GroupSearchComponent)
  },{
    path: 'admin-group-editor/:groupId',
    loadComponent: () => import('./admin-group-editor/admin-group-editor.component').then(c => c.AdminGroupEditorComponent)
  },{
    path: 'default-group-viewer/:groupId',
    loadComponent: () => import('./default-group-viewer/default-group-viewer.component').then(c => c.DefaultGroupViewerComponent)
  },
  {
    path: 'user-group-view/:groupId',
    loadComponent: () => import('./user-group-view/user-group-view.component').then(c => c.UserGroupViewComponent)
  }
];

