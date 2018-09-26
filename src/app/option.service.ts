import { Injectable } from '@angular/core';
import { Option } from './app.option';
import { OPTIONS } from './app.mock-options';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  constructor(private messageService: MessageService) { }

  getOptions(): Observable<Option[]> {
    this.messageService.add('MessageService: fetched options');
    return of(OPTIONS);
  }

  getOption(id: number): Observable<Option> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`OptionService: fetched option id=${id}`);
    return of(OPTIONS.find(option => option.id === id));
  }

}
