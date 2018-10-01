import { Injectable } from '@angular/core';
import { Option } from './app.option';
// import { OPTIONS } from './app.mock-options';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OptionService {

  private optionsUrl = 'api/options';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** Get options from a server */
  getOptions(): Observable<Option[]> {
    return this.http.get<Option[]>(this.optionsUrl)
      .pipe(
        tap(options => this.log('Fetched options')),
        catchError(this.handleError('getOptions', []))
    );
  }

  /** GET option by id. Will 404 if id not found */
  getOption(id: number): Observable<Option> {
    const url = `${this.optionsUrl}/${id}`;
    return this.http.get<Option>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Option>(`getHero id=${id}`))
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
