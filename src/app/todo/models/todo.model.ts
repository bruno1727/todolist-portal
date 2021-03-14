import { TodoResponse } from "../response/todo.response";

export class Todo {
    id: number;
    description: string = '';
    descriptionHtml: string = '';
    creationDate: Date;

    static of(todoResponse: TodoResponse): Todo{
        let todo = new Todo();
        todo.id = todoResponse.id
        todo.description = todoResponse.description
        todo.creationDate = todoResponse.creationDate;
        return todo;
    }
}
