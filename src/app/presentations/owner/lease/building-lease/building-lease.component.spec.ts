import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingLeaseComponent } from './building-lease.component';

describe('BuildingLeaseComponent', () => {
  let component: BuildingLeaseComponent;
  let fixture: ComponentFixture<BuildingLeaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildingLeaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuildingLeaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
