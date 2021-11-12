import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BookComponent } from './components/book/book.component';
import { Book } from './models/book';
import { BookService } from './providers/book.service';


class MockBookService {
  getFavorite() :Book {
    return new Book();
  }
}

describe('AppComponent', () => {

  let service: BookService;
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let component: BookComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [AppComponent, BookComponent],
      providers: [{
        provider: BookService,
        useClass: MockBookService
      }]
    }).compileComponents().then(() => {
      service = TestBed.inject(BookService);
    });
  });

  beforeEach(()=>{
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
    
  })

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
  
  describe('class',() => {
    describe('ngOnInit',() => {
      it('Should set the book property to equal getFavorite',() =>{
          let book : Book = new Book();
          spyOn(service, 'getFavorite').and.returnValue(book);
          app.ngOnInit();
          fixture.detectChanges();
          expect(service.getFavorite).toHaveBeenCalled();
          expect(app.favoriteBook).toEqual(new Book);
      });
    });
  });

  describe('template', () =>{
    it('should invoke favorite(book : Book) when favorite is emitted', () =>{
      let book: Book = new Book;
      spyOn(app, 'favorite');
      const favoriteElement: DebugElement = fixture.debugElement.query(By.css('gb-book'));
      const event :Event = new Event('favoriteEvent');
      favoriteElement.nativeElement.dispatchEvent(event);
      expect(app.favorite).toHaveBeenCalled();
    });
    it('should set the favoriteBook to the passed value', () =>{
      let oldBook: Book = new Book;
      let newBook: Book = new Book;
      newBook.title = 'new title';
      app.favoriteBook = oldBook;
      app.favorite(newBook);
      expect(app.favoriteBook).toBe(newBook);
    })
  });


  

});
