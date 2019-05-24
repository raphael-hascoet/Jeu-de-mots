import { GameConfig } from './game-config';

describe('GameConfig', () => {
  it('should create an instance', () => {
    expect(new GameConfig('a', 'a', 1)).toBeTruthy();
  });
});
