import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/providers/book.service';

@Component({
  selector: 'gb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  favoriteBook : Book;
  booksToRead : Array<Book> =[];

  constructor(private bookService : BookService){
    this.favoriteBook = new Book;
  }

  ngOnInit() : void{
    this.booksToRead = this.bookService.getBooksToRead();
    this.favoriteBook = this.bookService.getFavorite();

  }

  favorite(book : Book) : void{
    this.favoriteBook = book;
  }

}
