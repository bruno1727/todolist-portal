import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as MoraisEditor from '@bruno1727/ckeditor5-custom-build';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular';
import '@ckeditor/ckeditor5-build-classic/build/translations/pt';
import { Todo } from '../models/todo.model';
@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {

  @Input() todo: Todo;
  @Input() formGroup: FormGroup;

  get description(){return this.formGroup.get('description')};

  editor: CKEditor5.Editor;
  maxCharacters: number = 2000;
  currCharacters: number = 0;
  
  Editor = MoraisEditor;
  config: any = { 
    toolbar: [ 'bold', 'italic', 'link', 'undo', 'redo', 'numberedList', 'bulletedList'],
    placeholder: "Tarefa",
    language: 'pt',
    wordCount: {
      onUpdate: stats => {
        console.log('stats.characters: ' + stats.characters);
        this.currCharacters = stats.characters;
    }
    }
    

   };

  constructor() { }

  ngOnInit(): void {
    this.formGroup.get('description').valueChanges.subscribe(data =>{
      this.todo.descriptionHtml = data;
    })
  }

  public onReady( editor: CKEditor5.Editor ) {
    this.editor = editor;
    console.log(editor);
	}

  setDescription(event: any){
    this.todo.description = (document.getElementsByClassName('ck-editor__editable_inline')[0] as HTMLElement).innerText;
  }

}
