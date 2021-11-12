import { Component, Input, OnInit } from '@angular/core';
import { Book } from './models/book';
import { BookService } from './providers/book.service';

@Component({
  selector: 'gb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  favoriteBook : Book = new Book;

  constructor(private bookService : BookService){
    //this.favoriteBook = new Book;
  }

  ngOnInit() : void{
    this.favoriteBook = this.bookService.getFavorite();
  }

}
