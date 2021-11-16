import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';

import { SearchResultsComponent } from './search-results.component';

class MockActivatedRoute{
  queryParams: Observable<Params> = new Observable<Params>();
}

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchResultsComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useClass: MockActivatedRoute
        }
      ]
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
    it('subscribes to the queryParams', () => {
      const route: ActivatedRoute = TestBed.inject(ActivatedRoute);
      spyOn(route.queryParams, 'subscribe').and.callFake((callback : any) => {
        return callback( {term: '123'});
      });
      component.ngOnInit();
      expect(route.queryParams.subscribe).toHaveBeenCalled();
      expect(component.term).toBe('123'); 
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
