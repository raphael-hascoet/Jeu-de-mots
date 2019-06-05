import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameLobbyViewComponent } from './game-lobby-view.component';

describe('GameLobbyViewComponent', () => {
  let component: GameLobbyViewComponent;
  let fixture: ComponentFixture<GameLobbyViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameLobbyViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameLobbyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
