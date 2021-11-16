import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      declarations: [ SearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('class', () => {
    it('should call router.navigate and pass query', () =>{
      let searchTerm = 'someValue';
      spyOn(component.router, 'navigate').and.callFake((commands : any[], extras: any ) =>{
        expect(commands).toEqual(['search']);
        expect(extras.queryParams.term).toBe(searchTerm);
        return Promise.resolve(true);
      });
      let searchForm : NgForm = new NgForm([],[]);
      searchForm.value.term = searchTerm;
      component.search(searchForm);
      expect(component.router.navigate).toHaveBeenCalled();
    });
  });

  describe('template', () => {
    it('has a form', () =>{
      let formElement : DebugElement = fixture.debugElement.query(By.css('form'));
      expect(formElement.nativeElement).toBeDefined();
    });

    it('has a search input', () => {
      let formElement : DebugElement = fixture.debugElement.query(By.css('input'));
      expect(formElement.nativeElement).toBeDefined();
    });

    it('has a submit button', () => {
      let formElement : DebugElement = fixture.debugElement.query(By.css('button'));
      expect(formElement.nativeElement).toBeDefined();
    });

    it('calls the search method when ngSubmit event occurs on form', () => {
      spyOn(component, 'search').and.callFake(() => {});
      let formElement : DebugElement = fixture.debugElement.query(By.css('form'));
      let submitEvent : Event = new Event ('ngSubmit');
      formElement.nativeElement.dispatchEvent(submitEvent);
      expect(component.search).toHaveBeenCalled();
    });
  });
});
