import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Book } from '../models/book';

import { BookService } from './book.service';

describe('BookService', () => {
  let service: BookService;
  let httpClient : HttpClient;
  let response : Object = {
    items: [
      {
        volumeInfo: {
          title: 'title1',
          description: 'description1',
          authors: ['author1'],
          printType: 'BOOK1',
          imageLinks: {
            thumbnail: 'thumbnail1'
          }
        }
      },
      {},
      {}
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule]
    });
    service = TestBed.inject(BookService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getFavorite', () => {
    it('returns a defined book', () => {
      let result: Book = service.getFavorite();
      expect(result).toBeTruthy();
    });
  });

  describe('setFavorite', () => {
    it('sets favorite', () =>{
      const newFavorite = new Book();
      newFavorite.title = 'new Favorite';
      service.setFavorite(newFavorite);
      expect(service.favorite).toBe(newFavorite);
    });
  }); 

  
  
  describe('getSearchResults', () =>{
    let term :String = "";

    it('makes a GET request', () =>{
      spyOn(httpClient, 'get').and.returnValue(of(response));
      service.getSearchResults(term);
      expect(httpClient.get).toHaveBeenCalled();
    })

    it('uses the url for the base url', () => {
      spyOn(httpClient, 'get').and.callFake((url:any) : any => {
        expect(url).toContain('https://www.googleapis.com/books/v1/volumes');
        return of(response)
      });
      service.getSearchResults(term);
      expect(httpClient.get).toHaveBeenCalled();
    });

    it('adds the term as the value of q in the query params', () => {
      spyOn(httpClient, 'get').and.callFake((url:any):any => {
        expect(url).toContain('q=' + term);
        return of(response)
      });
      service.getSearchResults(term);
      expect(httpClient.get).toHaveBeenCalled();
    });

    it('returns a mapped object from items[].volumeInfo', () => {
      spyOn(httpClient, 'get').and.returnValue(of(response));
      let bookCount = 0;
      service.getSearchResults(term).subscribe((book : Book) => {
        bookCount +=1;
        expect(book).not.toBeUndefined();
        expect(book.title).toBe('title' + bookCount);
        expect(book.author).toBe('author' + bookCount);
        expect(book.description).toBe('description' + bookCount);
        expect(book.thumbnail).toBe('thumbnail' + bookCount);
        expect(book.type).toBe('BOOK' + bookCount);
      },
      (error : any) => {
        console.log(error);
      },
      () => {
        expect(bookCount).toBe(3);
      });
      expect(httpClient.get).toHaveBeenCalled();
    });

  });

  describe('getBooksToRead', () =>{
    it('returns 3 book objects', ()=>{
      expect(service.getBooksToRead().length).toBe(3);
    });

    it('changed the titles of the fifth book to be "To Read + 2"', () => {
      expect(service.getBooksToRead()[2].title).toEqual('To Read 2');
    });
  });
  
});


