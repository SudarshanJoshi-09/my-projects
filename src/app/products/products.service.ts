import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  navigate: any;
  // private apiUrl = 'http://localhost:3000/products'; // URL to the backend
  // constructor(private http: HttpClient) {}
  // getProducts(): Observable<Product[]> {
  //   debugger;
  //   return this.http.get<Product[]>(this.apiUrl); // Make GET request to fetch data
  // }
}
