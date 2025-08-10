import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitLeaseComponent } from './unit-lease.component';

describe('UnitLeaseComponent', () => {
  let component: UnitLeaseComponent;
  let fixture: ComponentFixture<UnitLeaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitLeaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnitLeaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
