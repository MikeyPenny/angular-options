import { Component, OnInit, Input } from '@angular/core';
import { Option } from '../app.option';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { OptionService } from '../option.service';

@Component({
  selector: 'app-option-detail',
  templateUrl: './option-detail.component.html',
  styleUrls: ['./option-detail.component.css']
})
export class OptionDetailComponent implements OnInit {

  @Input() option: Option;

  constructor(
    private route: ActivatedRoute,
    private optionService: OptionService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getOption();
  }

  getOption(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.optionService.getOption(id)
      .subscribe(option => this.option = option);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.optionService.updateOption(this.option)
      .subscribe(() => this.goBack());
  }

}
