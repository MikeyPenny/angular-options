import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Option } from '../app.option';
import { OptionService } from '../option.service';

@Component({
  selector: 'app-option-search',
  templateUrl: './option-search.component.html',
  styleUrls: ['./option-search.component.css']
})
export class OptionSearchComponent implements OnInit {

  options$: Observable<Option[]>;
  private searchTerms = new Subject<string>();

  constructor(private optionService: OptionService) { }

  // Push a search into the observable strean.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.options$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable  each time the term changes
      switchMap((term: string) => this.optionService.searchOptions(term))
    );
  }

}
