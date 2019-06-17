import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsCommandComponent } from './stats-command.component';

describe('StatsCommandComponent', () => {
  let component: StatsCommandComponent;
  let fixture: ComponentFixture<StatsCommandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsCommandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
