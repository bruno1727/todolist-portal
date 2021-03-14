import '@ckeditor/ckeditor5-build-classic/build/translations/pt';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Todo } from '../models/todo.model';
@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {

  @ViewChild( 'editor' ) editorComponent: CKEditorComponent;

  @Input() todo: Todo;
  
  Editor = ClassicEditor;
  config: any = { 
    toolbar: [ '|', 'bold', 'italic' ],
    placeholder: "Tarefa",
    language: 'pt'

   };

  constructor() { }

  ngOnInit(): void {
  }

  // public teste(){
  //   console.log(this.todo.description);
  // }

  setDescription(event: any){
    this.todo.description = event.editor.getData().replace(/(<([^>]+)>)/gi, "");
  }

}
