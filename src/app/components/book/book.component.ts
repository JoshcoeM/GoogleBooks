import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'gb-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  book : Book = new Book;

  constructor() { 
  }

  ngOnInit(): void {
    
  }

  favorite() : void{
    console.log('favorite pressed');
  }

}
