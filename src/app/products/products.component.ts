import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import {} from '@angular/common/http';
import { ProductService } from './products.service';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchInputService } from '../services/service/search-input.service';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    
// TODO: `HttpClientModule` should not be imported into a component directly.
// Please refactor the code to add `provideHttpClient()` call to the provider list in the
// application bootstrap logic and remove the `HttpClientModule` import from this component.
HttpClientModule,
    DataViewModule,
    ButtonModule,
    CommonModule,
    RouterModule,
    RatingModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ReactiveFormsModule,
    SidebarModule,
    // BrowserAnimationsModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductComponent implements OnInit {
  activeCategory: string | null = null;
  filteredProducts: any[] = [];
  searchInput: FormControl = new FormControl();
  sidebarVisible2: boolean = false;
  productsData: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductService,
    private search: SearchInputService
  ) {}
  value: number = 4;
  products: any[] = [];
  // allProducts: any[] = [
  //   { label: 'Fiction Book 1', category: 'fiction' },
  //   { label: 'Fiction Book 2', category: 'fiction' },
  //   { label: 'NCERT Book 1', category: 'ncert-books' },
  //   { label: 'NCERT Book 2', category: 'ncert-books' },
  //   { label: 'Historical Fiction 1', category: 'historical-fiction' },
  //   { label: 'Historical Fiction 2', category: 'historical-fiction' },
  // ];

  // List of categories
  categories: any[] = [
    { label: 'Fiction', value: 'fiction' },
    { label: 'NCERT Books', value: 'ncert-books' },
    { label: 'Historical Fiction', value: 'historical-fiction' },
    { label: 'Childrens', value: 'childrens' },
    { label: 'Books under 99', value: 'under-99' },
    { label: 'Books under 199', value: 'under-199' },
    { label: 'Literature', value: 'literature' },
  ];

  ngOnInit(): void {
    this.getProducts(); // Fetch products first

    // this.search.searchText.subscribe((text) => {
    //   console.log(text);
    //   this.filteredProducts = this.products.filter(
    //     (product) =>
    //       product.label.toLowerCase().includes(text.toLowerCase()) &&
    //       product.category === this.activeCategory
    //   );
    // });

    // Handle search input filtering
    this.searchInput.valueChanges.pipe(debounceTime(300)).subscribe((text) => {
      this.filteredProducts = this.productsData.filter(
        (product) =>
          product.label.toLowerCase().includes(text.toLowerCase()) &&
          (!this.activeCategory || product.category === this.activeCategory)
      );
    });

    // Subscribe to category change from route params
    this.route.params.subscribe((params) => {
      const category = params['category'];
      if (category) {
        this.onCategorySelect(category); // Apply category filter on route change
      } else {
        this.filteredProducts = this.productsData; // No category, show all products
      }
    });
  }

  // getProductLink(item: any): string[] {
  //   return ['/products', item.label.toLowerCase().replace(/\s+/g, '-')];
  // }

  onAddProduct(label: string) {
    //this.router.navigate(['/cart']);
    debugger;
    console.log(label);
    this.sidebarVisible2 = true;
  }

  async getProducts(): Promise<void> {
    try {
      const data = await this.productsService.getProducts().toPromise();
      console.log(data);
      this.productsData = data.data.products;
      this.filteredProducts = this.productsData; // Assign data to the local variable
      console.log(this.productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  onCategorySelect(category: string): void {
    this.activeCategory = category;
    //this.router.navigate(['products', category]);
    if (category === 'under-99') {
      this.filteredProducts = this.productsData.filter(
        (product) => product.price <= 99
      );
    } else {
      this.filteredProducts = this.productsData.filter(
        (product) => product.category === category
      );
    }
  }
}
