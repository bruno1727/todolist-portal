import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  @Input() tasks: Task[];

  @ViewChild("selectionList") selectionList: MatSelectionList;

  selectedTasks: Task[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  selectAll(){
    this.selectionList.selectAll();
  }

  deselectAll(){
    this.selectionList.deselectAll();
  }

}
