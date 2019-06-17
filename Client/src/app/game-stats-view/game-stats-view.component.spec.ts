import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameStatsViewComponent } from './game-stats-view.component';

describe('GameStatsViewComponent', () => {
  let component: GameStatsViewComponent;
  let fixture: ComponentFixture<GameStatsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameStatsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameStatsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
