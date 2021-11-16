import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, mergeMap, Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  favorite: Book = new Book(); 

  constructor(public httpClient : HttpClient) {
  }

  getFavorite() : Book{
    return this.favorite;
  }

  setFavorite(book : Book) :void {
    this.favorite = book;
  }

  getSearchResults(term : String) : Observable<Book>{
    let url= "https://www.googleapis.com/books/v1/volumes?q="+ term;
    return this.httpClient.get(url).pipe(mergeMap((value:any) => {
      return value.items;
    }))
    .pipe(map((value : any) => {
      return value.volumeInfo;
    }))
    .pipe(map((value: any) => {
      let book = new Book();
      book.title= value.title;
      book.description = value.description;
      book.author = value.authors.join(', ');
      book.type = value.printType;
      book.thumbnail = value.imageLinks.thumbnail;
      return book;
    }));}

  getBooksToRead() : Array<Book> {
    let results : Array<Book> =[];
    for(let i=0;i<3;i++){
      results.push(new Book());
      results[i].title ='To Read '+i;
    }
    return results;
  }
}
