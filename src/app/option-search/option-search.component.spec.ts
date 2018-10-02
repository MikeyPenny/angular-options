import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionSearchComponent } from './option-search.component';

describe('OptionSearchComponent', () => {
  let component: OptionSearchComponent;
  let fixture: ComponentFixture<OptionSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
