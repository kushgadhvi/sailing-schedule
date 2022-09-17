import { TestBed } from '@angular/core/testing';

import { SailingSchedulesService } from './sailing-schedules.service';

describe('SailingSchedulesService', () => {
  let service: SailingSchedulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SailingSchedulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
