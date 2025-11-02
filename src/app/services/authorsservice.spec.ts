import { TestBed } from '@angular/core/testing';

import { Authorsservice } from './authorsservice';

describe('Authorsservice', () => {
  let service: Authorsservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Authorsservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
