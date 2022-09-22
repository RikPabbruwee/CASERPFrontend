import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursusinstantieTableComponent } from './cursusinstantie-table.component';

describe('CursusinstantieTableComponent', () => {
  let component: CursusinstantieTableComponent;
  let fixture: ComponentFixture<CursusinstantieTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursusinstantieTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursusinstantieTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
