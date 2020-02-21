import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-exclude',
  templateUrl: './task-exclude.component.html',
  styleUrls: ['./task-exclude.component.scss']
})
export class TaskExcludeComponent implements OnInit {

  @Input() selectedTasks: string[];
  @Output() removeTasksEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  removeTasks(){
    let valid = true;

    if(!this.selectedTasks.length){
      this._snackBar.open("Nenhuma tarefa selecionada");
      valid = false;
    }
    this.removeTasksEvent.emit(valid);
  }

}
