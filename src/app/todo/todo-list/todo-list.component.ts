import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  @Input() todos: Todo[];

  selectAll = false;

  @ViewChild("selectionList") selectionList: MatSelectionList;

  selectedTodos: Todo[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  isAllSelected(){
    return this.selectedTodos.length == this.todos.length;
  }

  onSelectAll(){
    if(this.selectAll)
      this.selectionList.selectAll();
    else
    this.selectionList.deselectAll();
  }

  cleanSelection(){
    this.selectAll = false;
    this.onSelectAll();
  }

  selectionChange(){
    if(!this.isAllSelected())
      this.selectAll = false;
    else
      this.selectAll = true;
    
  }

}
