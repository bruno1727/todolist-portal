import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'app-todo-exclude',
  templateUrl: './todo-exclude.component.html',
  styleUrls: ['./todo-exclude.component.scss']
})
export class TodoExcludeComponent implements OnInit {

  @Input() selectedTodos: string[];
  @Output() removeTodosEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  tooltipPosition: TooltipPosition = 'below';

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  removeTodos(){
    let valid = true;

    if(!this.selectedTodos.length){
      this._snackBar.open("Nenhuma tarefa selecionada");
      valid = false;
    }
    this.removeTodosEvent.emit(valid);
  }

}
