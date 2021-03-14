import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DataSwitchModeComponent } from './data-switch-mode/data-switch-mode.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { TodoExcludeComponent } from './todo-exclude/todo-exclude.component';
import { TodoIncludeComponent } from './todo-include/todo-include.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoSearchComponent } from './todo-search/todo-search.component';
import { TodoComponent } from './todo/todo.component';

@NgModule({
  declarations: [TodoComponent, TodoSearchComponent, TodoIncludeComponent, TodoListComponent, TodoExcludeComponent, DataSwitchModeComponent, TextEditorComponent],
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
    MatSlideToggleModule,
    CKEditorModule
  ],
  // providers: [
  //   { provide: FateIconService, useClass: IconService }
  // ],
})
export class TodoModule { }
