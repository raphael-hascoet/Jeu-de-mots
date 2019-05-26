import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameConfigurationViewComponent } from './game-configuration-view.component';

describe('GameConfigurationViewComponent', () => {
  let component: GameConfigurationViewComponent;
  let fixture: ComponentFixture<GameConfigurationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameConfigurationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameConfigurationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
