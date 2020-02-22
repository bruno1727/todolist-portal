import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  @Input() tasks: string[];

  @ViewChild("selectionList") selectionList: MatSelectionList;

  selectedTasks: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  selectAll(){
    this.selectionList.selectAll();
  }

}
