import { TestBed } from '@angular/core/testing';

import { SystemMessageService } from './system-message.service';

describe('SystemMessageService', () => {
  let service: SystemMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
