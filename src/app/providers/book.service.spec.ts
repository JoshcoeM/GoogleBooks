import { TestBed } from '@angular/core/testing';

import { BookService } from './book.service';

describe('BookService', () => {
  let service: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getFavorite', () => {
    it('returns a defined book', () => {
      const service: BookService = TestBed.inject(BookService);
      expect(service.getFavorite()).toBeDefined();
    });
  });
  
  describe('getSearchResults', () =>{
    
    it('returns 10 Book Objects', () => {
      expect(service.getSearchResults('billy').length).toBe(10);
    });
  
    it('changed the titles of the fifth book to be "Search Results + 4"', () => {
      expect(service.getSearchResults('billy')[4].title).toEqual('Search Results 4');
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


