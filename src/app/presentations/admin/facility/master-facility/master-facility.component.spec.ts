import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterFacilityComponent } from './master-facility.component';

describe('MasterFacilityComponent', () => {
  let component: MasterFacilityComponent;
  let fixture: ComponentFixture<MasterFacilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterFacilityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MasterFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
