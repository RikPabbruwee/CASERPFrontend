import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursusplanningimportComponent } from './cursusplanningimport.component';

describe('CursusplanningimportComponent', () => {
  let component: CursusplanningimportComponent;
  let fixture: ComponentFixture<CursusplanningimportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursusplanningimportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursusplanningimportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
