import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from "./todo";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  apiUrl: string = 'https://todo-api-tda.herokuapp.com/api/todos';

  constructor(
    private http: HttpClient
  ) { }

  create(todo: Todo) : Observable<Todo>{
    return this.http.post<Todo>(this.apiUrl, todo)
  }

  getAll() : Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  delete(id: number) : Observable<void> {
    const url = `${this.apiUrl}/${id}`

    return this.http.delete<void>(url)
  }

  markAsDone(id: number) : Observable<Todo> {
    const url = `${this.apiUrl}/${id}/done`

    return this.http.patch<Todo>(url, {})
  }

}
