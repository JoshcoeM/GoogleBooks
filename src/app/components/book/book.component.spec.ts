import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BookComponent } from './book.component';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Class',() =>{
    it('Should have an book with a default title',() =>{
      expect(component.book.title).toBe('title');
    });
  });

  describe('Template',() => {
    it('Should print the book title', () =>{
      const labelElement : DebugElement = fixture.debugElement.query(By.css('.title'));
      expect(labelElement.nativeElement.textContent).toBe('Title: title');
    });
    
    it('Should print the book description', () =>{
      const labelElement : DebugElement = fixture.debugElement.query(By.css('.description'));
      expect(labelElement.nativeElement.textContent).toBe('Description: description');
    });

    it('Should print the book thumbnail', () =>{
      const labelElement : DebugElement = fixture.debugElement.query(By.css('.thumbnail'));
      expect(labelElement.nativeElement.getAttribute('src')).toBe('https://external-preview.redd.it/m2WilH2KUvUQk98_CMFLUYVDLEKQb_UIEvdz2SHJilY.png?auto=webp&s=f0a7d47e3c88736bdd1b4e6c247a0a66cfd46a32');
    });

    it('Should print the book author', () =>{
      const labelElement : DebugElement = fixture.debugElement.query(By.css('.author'));
      expect(labelElement.nativeElement.textContent).toBe('Author: author');
    });

    it('Should have a favourite button', () =>{
      const favoriteButton : DebugElement = fixture.debugElement.query(By.css('.favorite'));
      expect(favoriteButton.nativeElement.textContent).toBe('Favorite');
    });

    it('Should call bookComponent.favorite when favourite button is clicked',() =>{
      const favoriteButton : DebugElement = fixture.debugElement.query(By.css('.favorite'));
      spyOn(component, 'favorite');
      favoriteButton.nativeElement.click();
      expect(component.favorite).toHaveBeenCalled();
    });
  });
});
