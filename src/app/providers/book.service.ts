import { Injectable } from '@angular/core';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  favorite: Book = new Book(); 

  constructor() {
  }

  getFavorite() : Book{
    return this.favorite;
  }

  setFavorite(book : Book) :void {
    this.favorite = book;
  }

  getSearchResults(term : String) : Array<Book>{
    let results : Array<Book> = [];
    for(let i=0; i<10; i++){
      results.push(new Book());
      results[i].title= 'Search Results ' + i;
    }
    return results;
  }

  getBooksToRead() : Array<Book> {
    let results : Array<Book> =[];
    for(let i=0;i<3;i++){
      results.push(new Book());
      results[i].title ='To Read '+i;
    }
    return results;
  }
}
