import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/providers/book.service';
import { BookComponent } from '../book/book.component';
import { SearchComponent } from '../search/search.component';

import { HomeComponent } from './home.component';

class MockBookService {
  favorite : Book = new Book();
  getFavorite(): Book {
    return new Book();
  }
  setFavorite(book : Book) : void{
    //
  }
  getBooksToRead(): Book[] {
    return [];
  }
}

describe('HomeComponent', () => {
  let service: BookService;
  let home: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let component: BookComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [HomeComponent, BookComponent, SearchComponent],
      providers: [{
        provider: BookService,
        useClass: MockBookService
      }]
    })
    .compileComponents().then(() => {
      service = TestBed.inject(BookService);
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    home = fixture.componentInstance;
    fixture.detectChanges();

  })

  it('should create the app', () => {
    expect(home).toBeTruthy();
  });

  describe('class', () => {

    describe('ngOnInit', () => {
      it('sets the books to read to be the booksToRead from bookservice', () => {
        const booksToRead: Book[] = [new Book(), new Book(), new Book()];
        spyOn(service, 'getBooksToRead').and.returnValue(booksToRead);
        home.ngOnInit();
        fixture.detectChanges();
        expect(service.getBooksToRead).toHaveBeenCalled();
        expect(home.booksToRead).toBe(booksToRead);
      });
    });

    describe('addToFavorite', () => {
      it('should set the favoriteBook to the passed value', () => {
        let newFavorite: Book = new Book();
        const bookService : BookService = TestBed.inject(BookService);
        spyOn(bookService, 'setFavorite');
        newFavorite.title = 'new title';
        home.addToFavorite(newFavorite);
        expect(bookService.setFavorite).toHaveBeenCalledWith(newFavorite);
      });
    })

  });
  describe('template', () => {

    it('should have addNewBook anchor', () => {
      const addElement : DebugElement = fixture.debugElement.query(By.css('.booksToRead .addNewBook'));
      expect(addElement.nativeElement).toBeDefined();
    });


    it('renders a book object for each book', () => {
      home.booksToRead = [new Book(), new Book(), new Book()];
      fixture.detectChanges();
      const booksToRead = fixture.debugElement.queryAll(By.css('.booksToRead gb-book'));
      expect(booksToRead.length).toBe(3);
    });

   
  });
});
