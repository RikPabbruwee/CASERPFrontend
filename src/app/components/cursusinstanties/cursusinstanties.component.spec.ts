import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursusinstantiesComponent } from './cursusinstanties.component';

describe('CursusinstantiesComponent', () => {
  let component: CursusinstantiesComponent;
  let fixture: ComponentFixture<CursusinstantiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursusinstantiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursusinstantiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
