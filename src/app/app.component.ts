import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Todo } from './todo';
import { TodoService } from "./todo.service";
import toastr from "toastr";

@Component({
  selector: 'tda-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'todo-app';

  todos: Todo[] = [];

  form: FormGroup = new FormGroup({
    description : new FormControl('')
  })

  constructor(
    private service: TodoService
  ) {}

  ngOnInit(): void {
   this.getTodos()
  }
  
  getTodos(): void {
    this.service.getAll().subscribe(todoList => {
      this.todos = todoList;
    })
  }

  submit(){
    toastr.success("Tarefa criada com sucesso!");
    const todo: Todo = { ...this.form.value }
    
    this.service.create(todo)
    .subscribe(savedTodo => {
      this.todos.push(savedTodo)
      this.form.reset()
    })
  }

  delete(todo: Todo){
    toastr.success("Tarefa deletada com sucesso!");

    this.service.delete(todo.id).subscribe({
      
      next: (response) => this.getTodos()
    })
  }
}
