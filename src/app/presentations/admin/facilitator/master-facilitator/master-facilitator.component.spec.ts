import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterFacilitatorComponent } from './master-facilitator.component';

describe('MasterFacilitatorComponent', () => {
  let component: MasterFacilitatorComponent;
  let fixture: ComponentFixture<MasterFacilitatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterFacilitatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MasterFacilitatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
