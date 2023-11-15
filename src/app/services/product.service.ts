import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsUrl = 'http://localhost:8080';

  private headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', 'http://localhost:8080');

  constructor(private http: HttpClient) { }

  getProducts(page: number, amount: number): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl + '/get-products/'+ page + '/' + amount, {headers: this.headers});
  }

  getProductsByCategory(page: number, amount: number, category: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl + '/get-products-by-category/' + page + '/' + amount + '/' + category, {headers: this.headers});
  }

  getProductsCount(): Observable<number> {
    return this.http.get<number>(this.productsUrl + '/get-products-count', {headers: this.headers});
  }

  getProductsCountByCategory(category: string): Observable<number> {
    return this.http.get<number>(this.productsUrl + '/get-products-count/' + category, {headers: this.headers});
  }
}
