import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from "./todo";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  apiUrl: string = 'http://localhost:8080/api/todos';

  constructor(
    private http: HttpClient
  ) { }

  salvar(todo: Todo) : Observable<Todo>{
    return this.http.post<Todo>(this.apiUrl, todo)
  }
}
