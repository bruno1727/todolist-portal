import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { TaskSearchComponent } from './task-search/task-search.component';
import { TaskIncludeComponent } from './task-include/task-include.component';
import { TaskListComponent } from './task-list/task-list.component';



@NgModule({
  declarations: [TaskManagerComponent, TaskSearchComponent, TaskIncludeComponent, TaskListComponent],
  imports: [
    CommonModule
  ]
})
export class TaskManagerModule { }
