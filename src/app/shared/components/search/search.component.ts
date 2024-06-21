import { Component, EventEmitter, Output } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NgModel],
  templateUrl: './search.component.html',
  styleUrl: './search.component.sass'
})
export class SearchComponent {
  searchTerm: string = '';

  @Output() search = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();
  onSearch(): void {
    this.search.emit(this.searchTerm);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.clear.emit();
  }
}
