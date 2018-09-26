import { Component, OnInit } from '@angular/core';
import { Option } from '../app.option';
import { OptionService } from '../option.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  options: Option[] = [];

  constructor(private optionService: OptionService) { }

  ngOnInit() {
    this.getOptions();
  }

  getOptions(): void {
    this.optionService.getOptions()
      .subscribe(options => this.options = options.slice(1, 5));
  }

}
