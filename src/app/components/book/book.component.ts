import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/providers/book.service';

@Component({
  selector: 'gb-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  @Input()
  book: Book = new Book;
  
  @Input()
  isFavorite : Boolean = false;

  @Output()
  favoriteEvent : EventEmitter<Book> = new EventEmitter<Book>();


  constructor() { 
  }

  ngOnInit(): void {
  }

  favorite(): void {
    this.favoriteEvent.emit(this.book);
  }

}
