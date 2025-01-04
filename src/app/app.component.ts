import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SearchInputService } from './services/service/search-input.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonModule,
    MenubarModule,
    HomeComponent,
    CommonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  items: any[] = [];
  account: any[] = [];
  searchInput: FormControl = new FormControl();

  constructor(private router: Router, private search: SearchInputService) {}
  ngOnInit(): void {
    this.searchInput.valueChanges.pipe(debounceTime(300)).subscribe((text) => {
      console.log(text);
      this.search.setSearchText(text);
    });

    this.items = [
      { label: 'Home', icon: 'home', route: '/home' },
      { label: 'Products', icon: 'book_2', route: '/products' },
      { label: 'Contact', icon: 'mail', route: '/contact' },
    ];

    this.account = [
      { label: 'Cart', icon: 'shopping_cart', route: '/cart' },
      { label: 'Account', icon: 'account_circle', route: '/account/login' },
    ];
  }

  onLoginClick() {
    this.router.navigate(['./login']);
  }
}
