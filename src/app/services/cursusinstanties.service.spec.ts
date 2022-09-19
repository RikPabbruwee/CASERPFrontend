import { TestBed } from '@angular/core/testing';

import { CursusinstantiesService } from './cursusinstanties.service';

describe('CursusinstantiesService', () => {
  let service: CursusinstantiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursusinstantiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
