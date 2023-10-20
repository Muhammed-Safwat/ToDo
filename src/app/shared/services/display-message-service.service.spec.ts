import { TestBed } from '@angular/core/testing';

import { DisplayMessageServiceService } from './display-message-service.service';

describe('DisplayMessageServiceService', () => {
  let service: DisplayMessageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayMessageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
