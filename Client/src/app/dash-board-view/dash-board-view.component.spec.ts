import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBoardViewComponent } from './dash-board-view.component';

describe('DashBoardViewComponent', () => {
  let component: DashBoardViewComponent;
  let fixture: ComponentFixture<DashBoardViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashBoardViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashBoardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
