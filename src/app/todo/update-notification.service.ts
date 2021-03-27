import { Injectable, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { from, fromEvent, merge, Observable, of, Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { TodoService } from './todo.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateNotificationService implements OnDestroy {

  private subj = new Subject<string>();
  private subjObservable = this.subj.asObservable();
  private snackRef;
  private inactiveSubj = new Subject<boolean>();
  private doingSomeStuff: boolean = false;

  
  
  updatesCountSubject = new Subject<number>();
  private inactive: boolean = false;

  constructor(private _snackBar: MatSnackBar,
    private todoService: TodoService) {

      setInterval(function(){

        if(!this.inactive && this.todoService.lastUpdate){
          this.todoService.get(this.todoService.lastUpdate).subscribe(data => {
            this.updatesCountSubject.next(data.length);
          })
        }

      }.bind(this), 3000);

      let inactiveObservable = merge(fromEvent(document, 'click'), fromEvent(document, 'scroll'), fromEvent(document, 'mousemove'))
        .pipe(map(r =>{
          this.inactive = false;
        }))
        .pipe(debounceTime(5000));      

      inactiveObservable.subscribe(data => {
        this.inactive = true;
      }); 


    // this._doingSomeStuff();
    // this._areYouStillThere();
    
    console.log("contructor service");

  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  private _doingSomeStuff(){

    
    this.inactiveSubj.subscribe((data: boolean) => {
      if(data){
        this.snackRef = this._snackBar.open('Hey come back to us!');;
      }
      else{
        if(!this.doingSomeStuff){
          this.snackRef = this._snackBar.open('Doing some stuff..');
          this.doingSomeStuff = true;
        }
      }
    });

    let scrollOrClickEvent = merge(fromEvent(document, 'click'), fromEvent(document, 'scroll'), fromEvent(document, 'mousemove'))
    .pipe(map(r =>{
      this.inactiveSubj.next(false);
    }))
    .pipe(debounceTime(5000));      
    scrollOrClickEvent.subscribe(data => {
        this.inactiveSubj.next(true);
        this.doingSomeStuff = false;
      }); 
  };

  private _areYouStillThere(){
    this.subjObservable.subscribe(data => {
      this.snackRef = this._snackBar.open(data);
    });    

    let scrollEventObservable = fromEvent(document, 'scroll')
      .pipe(map(r => {
        if(this.snackRef)
          this.snackRef.dismiss();
      }))
      .pipe(debounceTime(5000));

    scrollEventObservable.subscribe(data => {
      this.subj.next('Are you still there?');
    })
  }
}
