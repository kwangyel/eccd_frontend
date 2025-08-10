import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandLeaseComponent } from './land-lease.component';

describe('LandLeaseComponent', () => {
  let component: LandLeaseComponent;
  let fixture: ComponentFixture<LandLeaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandLeaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandLeaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
