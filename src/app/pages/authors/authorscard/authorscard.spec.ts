import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Authorscard } from './authorscard';

describe('Authorscard', () => {
  let component: Authorscard;
  let fixture: ComponentFixture<Authorscard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Authorscard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Authorscard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
