import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailedLeaseComponent } from './view-detailed-lease.component';

describe('ViewDetailedLeaseComponent', () => {
  let component: ViewDetailedLeaseComponent;
  let fixture: ComponentFixture<ViewDetailedLeaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDetailedLeaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewDetailedLeaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
