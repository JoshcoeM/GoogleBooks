import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/providers/book.service';
import { BookComponent } from '../book/book.component';

import { HomeComponent } from './home.component';

class MockBookService {
  getFavorite(): Book {
    return new Book();
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
      imports: [RouterTestingModule],
      declarations: [HomeComponent, BookComponent],
      providers: [{
        provider: BookService,
        useClass: MockBookService
      }]
    }).compileComponents().then(() => {
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
      it('Should set the book property to equal getFavorite', () => {
        let book: Book = new Book();
        spyOn(service, 'getFavorite').and.returnValue(book);
        home.ngOnInit();
        fixture.detectChanges();
        expect(service.getFavorite).toHaveBeenCalled();
        expect(home.favoriteBook).toEqual(new Book);
      });
    });

    describe('booksToRead array', () => {
      it('should create many books on ititialize', () => {
        const booksToRead: Book[] = [new Book(), new Book(), new Book()];
        spyOn(service, 'getBooksToRead').and.returnValue(booksToRead);
        home.ngOnInit();
        fixture.detectChanges();
        expect(service.getBooksToRead).toHaveBeenCalled();
        expect(home.booksToRead).toBe(booksToRead);
      });
    });
  });
  describe('template', () => {

    it('should invoke favorite(book : Book) when favorite is emitted', () => {
      let book: Book = new Book;
      spyOn(home, 'favorite');
      const favoriteElement: DebugElement = fixture.debugElement.query(By.css('gb-book'));
      const event: Event = new Event('favoriteEvent');
      favoriteElement.nativeElement.dispatchEvent(event);
      expect(home.favorite).toHaveBeenCalled();
    });

    it('should set the favoriteBook to the passed value', () => {
      let oldBook: Book = new Book;
      let newBook: Book = new Book;
      newBook.title = 'new title';
      home.favoriteBook = oldBook;
      home.favorite(newBook);
      expect(home.favoriteBook).toBe(newBook);
    });

    it('renders a book object for each book', () => {
      home.booksToRead = [new Book(), new Book(), new Book()];
      fixture.detectChanges();
      const booksToRead = fixture.debugElement.queryAll(By.css('.booksToRead gb-book'));
      expect(booksToRead.length).toBe(3);
    })
  });
});
