import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/providers/book.service';
import { BookComponent } from '../book/book.component';

import { SearchResultsComponent } from './search-results.component';

class MockActivatedRoute{
  queryParams: Observable<Params> = new Observable<Params>();
}

class MockBookService {
  getSearchResults(term:String): Observable<Book> {
    return of();
  }
}

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchResultsComponent, BookComponent ],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide : BookService, useClass: MockBookService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe ('class', () =>{
    describe('ngOnInit', () => {
      it('subscribes to the queryParams', () => {
        const route: ActivatedRoute = TestBed.inject(ActivatedRoute);
        spyOn(route.queryParams, 'subscribe').and.callFake((callback : any) => {
          return callback( {term: '123'});
        });
        component.ngOnInit();
        expect(route.queryParams.subscribe).toHaveBeenCalled();
        expect(component.term).toBe('123'); 
      });

      it('gets the results for the term from the book service and stores them',() => {
        const route: ActivatedRoute = TestBed.inject(ActivatedRoute);
        spyOn(route.queryParams, 'subscribe').and.callFake((callback : any) => {
          return callback({term : '123'});          
        });
        let book: Book = new Book();
        book.title = 'test title';
        spyOn(component.bookService, 'getSearchResults').and.returnValue(of(book));
        component.ngOnInit();
        expect(component.bookService.getSearchResults).toHaveBeenCalledWith('123');
        expect(component.results).toBeDefined();
        expect(component.results).toEqual([book]);
      });
    });
  });

  describe ('template', () =>{
    it('displays the term', () => {
      component.term = 'banana';
      fixture.detectChanges();
      const termElement = fixture.debugElement.query(By.css('.searchTerm'));
      expect(termElement.nativeElement.textContent).toBe('banana!');
    });
  });
});
