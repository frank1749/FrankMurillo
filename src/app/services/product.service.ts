import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { ApiResponse } from '../interfaces/api-response.interface';
import { environment } from '../../enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${this.apiUrl}/bp/products`);
  }

  getProductById(id: string | number): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${this.apiUrl}/bp/products/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/bp/products`, product);
  }

  updateProduct(product: Product, id: string | number): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/bp/products/${id}`, product);
  }

  deleteProduct(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/bp/products/${id}`);
  }
}
