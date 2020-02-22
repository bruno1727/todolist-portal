import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { TaskSearchComponent } from './task-search/task-search.component';
import { TaskIncludeComponent } from './task-include/task-include.component';
import { TaskListComponent } from './task-list/task-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import { TaskExcludeComponent } from './task-exclude/task-exclude.component';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [TaskManagerComponent, TaskSearchComponent, TaskIncludeComponent, TaskListComponent, TaskExcludeComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatListModule,
    MatCardModule,
    MatSnackBarModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class TaskManagerModule { }
