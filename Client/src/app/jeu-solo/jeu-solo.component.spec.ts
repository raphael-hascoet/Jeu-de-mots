import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JeuSoloComponent } from './jeu-solo.component';

describe('JeuSoloComponent', () => {
  let component: JeuSoloComponent;
  let fixture: ComponentFixture<JeuSoloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JeuSoloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JeuSoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
