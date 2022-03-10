import { Component } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Todo } from './todo';
import { TodoService } from "./todo.service";
import toastr from "toastr";

@Component({
  selector: 'tda-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-app';

  todos: Todo[] = [];

  form: FormGroup = new FormGroup({
    description : new FormControl('')
  })

  constructor(
    private service: TodoService
  ) {}

  submit(){
    toastr.success("Solicitação processada com sucesso!");
    const todo: Todo = { ...this.form.value }
    
    this.service.salvar(todo)
    .subscribe(savedTodo => {
      this.todos.push(savedTodo)
      this.form.reset()
    })
  }
}
