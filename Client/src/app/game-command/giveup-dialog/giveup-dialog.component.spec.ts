import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveupDialogComponent } from './giveup-dialog.component';

describe('GiveupDialogComponent', () => {
  let component: GiveupDialogComponent;
  let fixture: ComponentFixture<GiveupDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiveupDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiveupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
