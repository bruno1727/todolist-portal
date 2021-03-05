import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalStorage } from '../local-storage';

@Component({
  selector: 'app-data-switch-mode',
  templateUrl: './data-switch-mode.component.html',
  styleUrls: ['./data-switch-mode.component.scss']
})
export class DataSwitchModeComponent implements OnInit {

  @Output() changeOutput: EventEmitter<void> = new EventEmitter<void>();

  online = !LocalStorage.isOffline();

  constructor() { }

  ngOnInit(): void {
  }

  change(){
    LocalStorage.setOffline(!this.online);
    this.changeOutput.emit();
  }

}
