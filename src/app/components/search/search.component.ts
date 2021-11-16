import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'gb-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  search(searchForm : NgForm) :void{
    let searchData = searchForm.value;
    let term = searchData.term;
    this.router.navigate(['search'],{
      queryParams : {
        term: term
      }
    });
  }

}
