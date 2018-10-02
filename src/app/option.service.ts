import { Injectable } from '@angular/core';
import { Option } from './app.option';
// import { OPTIONS } from './app.mock-options';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  private optionsUrl = 'api/options'; // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** Get options from a server */
  getOptions (): Observable<Option[]> {
    return this.http.get<Option[]>(this.optionsUrl)
      .pipe(
        tap(options => this.log('Fetched options')),
        catchError(this.handleError('getOptions', []))
    );
  }

  /** GET option by id. Will 404 if id not found */
  getOption (id: number): Observable<Option> {
    const url = `${this.optionsUrl}/${id}`;
    return this.http.get<Option>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Option>(`getHero id=${id}`))
      );
  }

  //////// Save methods //////////

  /** PUT: update the option on the server */
  updateOption (option: Option): Observable<any> {
    return this.http.put(this.optionsUrl, option, httpOptions)
      .pipe(
        tap(_ => this.log(`updated option id=${option.id}`)),
        catchError(this.handleError<any>('updatedOption'))
      );
  }

  /** POST: add a new option to the server */
  addOption (option: Option): Observable<Option> {
    return this.http.post<Option>(this.optionsUrl, option, httpOptions)
      .pipe(
        tap((optionT: Option) => this.log(`added option w/ id=${optionT.id}`)),
        catchError(this.handleError<Option>('addOption'))
      );
  }

  /** DELETE: delete the option from the server */
  deleteOption (option: Option | number): Observable<Option> {
    const id = typeof option === 'number' ? option : option.id;
    const url = `${this.optionsUrl}/${id}`;

    return this.http.delete<Option>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted option id=${id}`)),
        catchError(this.handleError<Option>('deleteOption'))
      );
  }


  /* GET options whose name contains search term */
  searchOptions(term: string): Observable<Option[]> {
    if (!term.trim()) {
      // If not search term, return empty option array.
      return of([]);
    }
    return this.http.get<Option[]>(`${this.optionsUrl}/?name=${term}`)
    .pipe(
      tap(_ => this.log(`found option matching "${term}"`)),
      catchError(this.handleError<Option[]>('searchOptions', []))
    );
  }


  /** Log a OptionService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`OptionService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
