import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'app-task-exclude',
  templateUrl: './task-exclude.component.html',
  styleUrls: ['./task-exclude.component.scss']
})
export class TaskExcludeComponent implements OnInit {

  @Input() selectedTasks: string[];
  @Output() removeTasksEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  tooltipPosition: TooltipPosition = 'below';

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
