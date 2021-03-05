import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo/todo.component';
import { TodoSearchComponent } from './todo-search/todo-search.component';
import { TodoIncludeComponent } from './todo-include/todo-include.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import { TodoExcludeComponent } from './todo-exclude/todo-exclude.component';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DataSwitchModeComponent } from './data-switch-mode/data-switch-mode.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [TodoComponent, TodoSearchComponent, TodoIncludeComponent, TodoListComponent, TodoExcludeComponent, DataSwitchModeComponent],
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
    MatTooltipModule,
    MatCheckboxModule,
    MatSlideToggleModule
  ]
})
export class TodoModule { }
