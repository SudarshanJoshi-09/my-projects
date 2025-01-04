import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './products.service';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { SearchInputService } from '../services/service/search-input.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    HttpClientModule,
    DataViewModule,
    ButtonModule,
    CommonModule,
    RouterModule,
    RatingModule,
    FormsModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductComponent implements OnInit {
  activeCategory: string | null = null;
  filteredProducts: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductService,
    private search: SearchInputService
  ) {}
  value: number = 4;
  products: any[] = [];
  allProducts: any[] = [
    { label: 'Fiction Book 1', category: 'fiction' },
    { label: 'Fiction Book 2', category: 'fiction' },
    { label: 'NCERT Book 1', category: 'ncert-books' },
    { label: 'NCERT Book 2', category: 'ncert-books' },
    { label: 'Historical Fiction 1', category: 'historical-fiction' },
    { label: 'Historical Fiction 2', category: 'historical-fiction' },
  ];

  // List of categories
  categories: any[] = [
    { label: 'Fiction', value: 'fiction' },
    { label: 'NCERT Books', value: 'ncert-books' },
    { label: 'Historical Fiction', value: 'historical-fiction' },
    { label: 'Childrens', value: 'childrens' },
    { label: 'Books under 99', value: 'under-199' },
    { label: 'Books under 199', value: 'under-99' },
    { label: 'Literature', value: 'literature' },
  ];

  fiction: any[] = [
    {
      img: 'https://img.bookchor.com/images/cover/5/9781906082130.jpg',
      label: 'Hollow Earth',
      author: 'Hayao Miyazaki',
      price: 220,
      originalPrice: 399,
      ratings: 4,
      category: 'fiction',
    },
    {
      img: 'https://img.bookchor.com/images/cover/12/9780521618700.jpg',
      label: 'Romeo and Juliet',
      author: 'William Shakespeare',
      price: 235,
      originalPrice: 599,
      ratings: 4,
      category: 'fiction',
    },
    {
      img: 'https://img.bookchor.com/images/cover/21/9780521434942.jpg',
      label: 'Hamlet',
      author: 'William Shakespeare',
      price: 200,
      originalPrice: 399,
      ratings: 4,
      category: 'fiction',
    },

    {
      img: 'https://img.bookchor.com/images/cover/31/9780521435369.jpg',
      label: 'Twelfth Night',
      author: 'William Shakespeare',
      price: 320,
      originalPrice: 799,
      ratings: 3,
      category: 'fiction',
    },
    {
      img: 'https://img.bookchor.com/images/cover/35/9781847673213.jpg',
      label: 'Chocolate and Cuckoo Clocks',
      author: 'Alan Coren',
      price: 320,
      originalPrice: 699,
      ratings: 4,
      category: 'fiction',
    },
    {
      img: 'https://img.bookchor.com/images/cover/35/9781847676573.jpg',
      label: 'Jamrachs Menagerie',
      author: 'Carol Birch',
      price: 180,
      originalPrice: 399,
      ratings: 2,
      category: 'fiction',
    },
    {
      img: 'https://img.bookchor.com/images/cover/56/9780440224846.jpg',
      label: 'Bittersweet',
      author: 'Danielle Steel',
      price: 220,
      originalPrice: 399,
      ratings: 4,
      category: 'fiction',
    },
    {
      img: 'https://img.bookchor.com/images/cover/56/9780440221319.jpg',
      label: 'The gift',
      author: 'Danielle Steel',
      price: 107,
      originalPrice: 199,
      ratings: null,
      category: 'fiction',
    },
    {
      img: 'https://img.bookchor.com/images/cover/56/9780440130918.jpg',
      label: 'The Golden Cup',
      author: 'Belva Plain',
      price: 180,
      originalPrice: 399,
      ratings: 2,
      category: 'fiction',
    },
  ];

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const category = params['category'];
      if (category) {
        this.onCategorySelect(category);
      }
    });

    this.search.searchText.subscribe((text) => {
      console.log(text);
      this.filteredProducts = this.products.filter(
        (product) =>
          product.label.toLowerCase().includes(text.toLowerCase()) &&
          product.category === this.activeCategory
      );
    });
  }

  getProductLink(item: any): string[] {
    return ['/products', item.label.toLowerCase().replace(/\s+/g, '-')];
  }

  onAddProduct(label: string) {
    this.router.navigate(['/cart']);
  }

  // getProducts(): void {
  //   debugger;
  //   this.productsService.getProducts().subscribe({
  //     next: (data) => {
  //       console.log(data);
  //       this.productsData = data; // Assign data to the local variable
  //     },
  //     error: (error) => {
  //       console.error('Error fetching products:', error);
  //     },
  //   });
  // }

  onCategorySelect(category: string) {
    // Dynamically set products based on the selected category
    this.activeCategory = category;
    switch (category) {
      case 'fiction':
        this.products = this.fiction;
        this.filteredProducts = this.fiction;
        break;
      case 'ncert-books':
        this.filteredProducts = [
          {
            name: 'NCERT Book 1',
            author: 'Author A',
            price: 150,
            originalPrice: 250,
            ratings: 5,
            img: 'https://via.placeholder.com/150',
          },
          {
            name: 'NCERT Book 2',
            author: 'Author B',
            price: 120,
            originalPrice: 220,
            ratings: 4,
            img: 'https://via.placeholder.com/150',
          },
        ];
        break;
      // Add similar cases for other categories if needed
      default:
        this.filteredProducts = [];
        break;
    }
  }
}
