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

  getProducts(amount: number): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl + '/get-products?amount=' + amount, {headers: this.headers});
  }

  getProductsByCategory(amount: number, category: string, ): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl + '/get-products-by-category?amount=' + amount + "&category=" + category, {headers: this.headers});
  }
}
