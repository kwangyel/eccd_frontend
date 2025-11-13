import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterStudentComponent } from './master-student.component';

describe('MasterStudentComponent', () => {
  let component: MasterStudentComponent;
  let fixture: ComponentFixture<MasterStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MasterStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
