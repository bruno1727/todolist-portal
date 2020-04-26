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

  selectAll = false;

  @ViewChild("selectionList") selectionList: MatSelectionList;

  selectedTasks: Task[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  isAllSelected(){
    return this.selectedTasks.length == this.tasks.length;
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
