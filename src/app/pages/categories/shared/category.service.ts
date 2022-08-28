import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"

import { Observable, throwError } from "rxjs"
import { map, catchError, flatMap } from "rxjs/operators"

import { Category } from "./category.model"

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _apiPath: string = "api/categories";

  constructor(private _http: HttpClient) { }

  private _jsonDataToCategories(jsonData: any[]): Category[] {
    const categories: Category[] = [];
    jsonData.forEach(e => categories.push(e as Category));

    return categories;
  }

  private _jsonDataToCategory(jsonData: any): Category {
    return jsonData as Category;
  }

  private _handleError(error: any): Observable<any> {
    console.log("Erro na requisição", error);
    return throwError(error);
  }

  getAll(): Observable<Category[]> {
    return this._http.get(this._apiPath).pipe(
      catchError(this._handleError),
      map(this._jsonDataToCategories)
    )
  }

  getById(id: number): Observable<Category> {
    const url = `${this._apiPath}/${id}`;

    return this._http.get(url).pipe(
      catchError(this._handleError),
      map(this._jsonDataToCategory)
    )
  }

  create(category: Category): Observable<Category> {
    return this._http.post(this._apiPath, category)
  }
}
