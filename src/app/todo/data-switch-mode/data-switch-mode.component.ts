import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-data-switch-mode',
  templateUrl: './data-switch-mode.component.html',
  styleUrls: ['./data-switch-mode.component.scss']
})
export class DataSwitchModeComponent implements OnInit {

  @Output() changeOutput: EventEmitter<void> = new EventEmitter<void>();

  online = !this.localStorageService.isOffline();

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
  }

  change(){
    this.localStorageService.setOffline(!this.online);
    this.changeOutput.emit();
  }

}
