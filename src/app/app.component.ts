import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Todo } from './todo';
import { TodoService } from "./todo.service";
import toastr from "toastr";
import { Observable } from 'rxjs';

@Component({
  selector: 'tda-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'todo-app';

  todos: Todo[] = [];

  form: FormGroup = new FormGroup({
    description: new FormControl('')
  })

  constructor(
    private service: TodoService
  ) { }

  ngOnInit(): void {
    this.getTodos()
  }

  getTodos(): void {
    this.service.getAll().subscribe(todoList => {
      this.todos = todoList;
    })
  }

  submit() {
    toastr.success("Tarefa criada com sucesso!");
    const todo: Todo = { ...this.form.value }

    this.service.create(todo)
      .subscribe(savedTodo => {
        this.todos.push(savedTodo)
        this.form.reset()
      })
  }

  delete(todo: Todo) {
    toastr.success("Tarefa deletada com sucesso!");
    const mustDelete = confirm('Deseja realmente excluir esta tarefa?');
    if (mustDelete) {
      this.service.delete(todo.id).subscribe({

        next: (response) => this.getTodos()
      })
    }

  }

  done(todo: Todo) {
    toastr.success("Tarefa marcada como concluída!");
    const mustDelete = confirm('Deseja realmente marcar como concluída?');
    if (mustDelete) {
      this.service.markAsDone(todo.id).subscribe({
        next: (todoUpdated) => {
          todo.done = todoUpdated.done
          todo.doneDate = todoUpdated.doneDate
        }
      })
    }
    
  }
}
