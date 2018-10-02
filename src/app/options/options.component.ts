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

  add(name: string): void {
    name = name.trim();
    if  (!name) {return; }
      this.optionService.addOption({name} as Option)
        .subscribe(option => {
          this.options.push(option);
        });
  }

  delete(option: Option): void {
    this.options = this.options.filter(o => o !== option);
    this.optionService.deleteOption(option).subscribe();
  }

}
