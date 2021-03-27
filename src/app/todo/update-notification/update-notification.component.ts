import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { UpdateNotificationService } from '../update-notification.service';

@Component({
  selector: 'app-update-notification',
  templateUrl: './update-notification.component.html',
  styleUrls: ['./update-notification.component.scss']
})
export class UpdateNotificationComponent implements OnInit {

  updates: number = 0;
  show: boolean;

  constructor(
    private updateNotificationService: UpdateNotificationService,
    private todoService: TodoService) { }

  ngOnInit(): void {

    this.updateNotificationService.updatesCountSubject.subscribe(data => {
      this.updates = data;
      if(data > 0)
      this.show = true;
    })
  }

  click(){
    this.show = false;
    this.todoService.updateSubject.next(1);
  }

}
