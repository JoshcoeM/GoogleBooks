import { ComponentFixture, TestBed } from '@angular/core/testing';
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
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

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

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  

  describe('ngOnInit',() => {
    it('Should set the book property to equal getFavorite',() =>{
        let book : Book = new Book();
        const fixture= TestBed.createComponent(AppComponent);
        const app= fixture.componentInstance;
        spyOn(service, 'getFavorite').and.returnValue(book);
        app.ngOnInit();
        fixture.detectChanges();
        expect(service.getFavorite).toHaveBeenCalled();
        expect(app.favoriteBook).toEqual(new Book);
    });
  });  

});
