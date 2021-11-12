import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BookComponent } from './components/book/book.component';
import { Book } from './models/book';
import { BookService } from './providers/book.service';

 describe('AppComponent', () => {

   let fixture: ComponentFixture<AppComponent>;
   let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [AppComponent, BookComponent],
      providers: []
    });
  });

  beforeEach(()=>{
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

});
