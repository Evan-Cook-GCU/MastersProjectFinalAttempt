import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ErrorComponent } from './error/error.component';
import { layoutRoutes } from './layouts/layouts.routing';
import { CompleteTableExampleComponent } from './complete-table-example/complete-table-example.component';
import { PrimengTableCompleteComponent } from './primeng-table-complete/primeng-table-complete.component';

export const routes: Routes = [
    ...layoutRoutes,
    { path: 'error', component: ErrorComponent},
    { path: 'table-example', component: CompleteTableExampleComponent},
    { path: 'primeng-table-example', component: PrimengTableCompleteComponent}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule { }
