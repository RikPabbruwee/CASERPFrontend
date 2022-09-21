import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CursusinstantiesService } from 'src/app/services/cursusinstanties.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CursusplanningimportComponent } from './cursusplanningimport.component';

describe('CursusplanningimportComponent', () => {
  let component: CursusplanningimportComponent;
  let fixture: ComponentFixture<CursusplanningimportComponent>;
  describe('Auto generated tests', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [HttpClientTestingModule ],
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
  })
  // describe('Http client test', () => {
  //   let sut: CursusplanningimportComponent;
  //   let cursusinstantiesService: CursusinstantiesService;
  //   beforeEach(() => {
  //     TestBed.configureTestingModule({
  //       imports: [HttpClientTestingModule ],
  //       declarations: [CursusplanningimportComponent],
  //       providers: [CursusinstantiesService]
  //     })
  //     sut = TestBed.createComponent(CursusplanningimportComponent).componentInstance;
  //     cursusinstantiesService = TestBed.inject(CursusinstantiesService);
  //     spyOn(cursusinstantiesService, 'sendImport');
  //   })
  //   it('should send imported file to backend', () => {
  //     sut.sendToBackend();
  //     expect(cursusinstantiesService.sendImport).toHaveBeenCalled();
  //   })
  // })
});
