import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { CursusinstantiesService } from 'src/app/services/cursusinstanties.service';

import { CursusinstantiesComponent } from './cursusinstanties.component';

describe('CursusinstantiesComponent', () => {
  let component: CursusinstantiesComponent;
  let fixture: ComponentFixture<CursusinstantiesComponent>;
  describe('Auto generated tests', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [HttpClientTestingModule ],
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
  })
  // describe('Http client test', () => {
  //   let sut: CursusinstantiesComponent;
  //   let cursusinstantiesService: CursusinstantiesService;
  //   beforeEach(() => {
  //     TestBed.configureTestingModule({
  //       imports: [HttpClientTestingModule ],
  //       declarations: [CursusinstantiesComponent],
  //       providers: [CursusinstantiesService]
  //     })
  //     sut = TestBed.createComponent(CursusinstantiesComponent).componentInstance;
  //     cursusinstantiesService = TestBed.inject(CursusinstantiesService);
  //     spyOn(cursusinstantiesService, 'getAll');//.and.returnValue(Observable.of(true));
  //   })
  //   it('should get all cursus instanties', () => {
  //     sut.ngOnInit();
  //     expect(cursusinstantiesService.getAll).toHaveBeenCalled();
  //   })
  // })
  
});
