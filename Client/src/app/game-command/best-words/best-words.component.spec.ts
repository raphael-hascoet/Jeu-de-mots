import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestWordsComponent } from './best-words.component';

describe('BestWordsComponent', () => {
  let component: BestWordsComponent;
  let fixture: ComponentFixture<BestWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestWordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
