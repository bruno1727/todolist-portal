import { TodoLocalStorage } from "../models/todo-local-storage.model";

export class TodoResponse {
    id: number;
    description: string;
    creationDate: Date;
    
    public constructor(todoLocalStorage: TodoLocalStorage){
        this.id = todoLocalStorage.id;
        this.description = todoLocalStorage.description;
        this.creationDate = todoLocalStorage.creationDate;
    }
}
