import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '../local-storage';

@Component({
  selector: 'app-data-switch-mode',
  templateUrl: './data-switch-mode.component.html',
  styleUrls: ['./data-switch-mode.component.scss']
})
export class DataSwitchModeComponent implements OnInit {

  offline = LocalStorage.isOffline();

  constructor() { }

  ngOnInit(): void {
  }

  change(){
    LocalStorage.setOffline(this.offline);
  }

}
