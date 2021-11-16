import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/providers/book.service';

@Component({
  selector: 'gb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  booksToRead : Array<Book> =[];

  constructor(public bookService : BookService){
  }

  ngOnInit() : void{
    this.booksToRead = this.bookService.getBooksToRead();

  }

  addToFavorite(book : Book) : void{
    this.bookService.setFavorite(book);
  }



}
