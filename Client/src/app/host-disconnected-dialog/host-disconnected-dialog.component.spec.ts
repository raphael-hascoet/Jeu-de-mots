import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostDisconnectedDialogComponent } from './host-disconnected-dialog.component';

describe('HostDisconnectedDialogComponent', () => {
  let component: HostDisconnectedDialogComponent;
  let fixture: ComponentFixture<HostDisconnectedDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostDisconnectedDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostDisconnectedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
