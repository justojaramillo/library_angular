import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bookscard } from './bookscard';

describe('Bookscard', () => {
  let component: Bookscard;
  let fixture: ComponentFixture<Bookscard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bookscard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bookscard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
