import { TestBed } from '@angular/core/testing';

import { Booksservice } from './booksservice';

describe('Booksservice', () => {
  let service: Booksservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Booksservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
