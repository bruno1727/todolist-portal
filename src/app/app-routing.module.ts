import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskManagerComponent } from './task-manager/task-manager/task-manager.component';


const routes: Routes = [
  { path: 'task-manager', component: TaskManagerComponent },
  { path: '', redirectTo: '/task-manager', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
