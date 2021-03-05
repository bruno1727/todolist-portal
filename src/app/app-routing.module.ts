import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from './todo/todo/todo.component';


const routes: Routes = [
  { path: 'task-manager', component: TodoComponent },
  { path: '', redirectTo: '/task-manager', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
