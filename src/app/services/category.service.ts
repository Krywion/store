import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private productsUrl = 'http://localhost:8080';

  private headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', 'http://localhost:8080');

  constructor(private http: HttpClient) { }

    getCategories(): Observable<string[]> {
        this.http.get<string[]>(this.productsUrl + '/get-products-category', {headers: this.headers}).subscribe(
            (categories) => {
              console.log(categories);
            });
        return this.http.get<string[]>(this.productsUrl + '/get-products-category', {headers: this.headers});
    }
}
