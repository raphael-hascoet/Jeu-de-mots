import { TestBed } from '@angular/core/testing';

import { DefinitionsService } from './definitions.service';

describe('DefinitionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DefinitionsService = TestBed.get(DefinitionsService);
    expect(service).toBeTruthy();
  });
});
