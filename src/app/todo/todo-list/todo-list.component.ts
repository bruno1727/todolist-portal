import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { Todo } from '../models/todo.model';
import { trigger, transition, animate, style, state } from "@angular/animations";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss',],
  animations: [
    trigger("inOutTrigger", [
      state('out', style({ opacity: '*'})),
      transition("void => *", [
        style({opacity: 0}),
        animate('100ms', style({ opacity: 1}))]
      ),
      transition("* => void", [
        style({height: '*'}),
        animate('100ms', style({ height: '0'}))]
      )
    ])
  ]
})
export class TodoListComponent implements OnInit {

  @Input() todos: Todo[];

  selectAll = false;

  @ViewChild("selectionList") selectionList: MatSelectionList;

  selectedTodos: Todo[] = [];

  constructor() { }

  ngOnInit(): void {
    console.log('init');
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
