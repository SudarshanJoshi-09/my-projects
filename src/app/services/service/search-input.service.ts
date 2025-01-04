import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchInputService {
  private searchTextSubject = new BehaviorSubject<string>('');
  searchText = this.searchTextSubject.asObservable();

  constructor() {}

  setSearchText(text: string) {
    this.searchTextSubject.next(text.toLowerCase());
  }
}
