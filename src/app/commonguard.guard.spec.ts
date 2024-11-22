import { TestBed } from '@angular/core/testing';

import { CommonguardGuard } from './commonguard.guard';

describe('CommonguardGuard', () => {
  let guard: CommonguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CommonguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
