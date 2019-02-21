import { TestBed } from '@angular/core/testing';

import { NewsserviceService } from './newsservice.service';

describe('NewsserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewsserviceService = TestBed.get(NewsserviceService);
    expect(service).toBeTruthy();
  });
});
