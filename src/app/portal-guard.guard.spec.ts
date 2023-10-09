import { TestBed } from '@angular/core/testing';

import { PortalGuardGuard } from './portal-guard.guard';

describe('PortalGuardGuard', () => {
  let guard: PortalGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PortalGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
