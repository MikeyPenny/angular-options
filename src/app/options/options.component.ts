import { Component, OnInit } from '@angular/core';
import { Option } from '../app.option';
import { OptionService } from '../option.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css'],
})
export class OptionsComponent implements OnInit {

  options: Option[];


  constructor(private optionService: OptionService) { }

  ngOnInit() {
    this.getOptions();
  }

  getOptions(): void {
    this.optionService.getOptions()
      .subscribe(options => this.options = options);
  }

}
