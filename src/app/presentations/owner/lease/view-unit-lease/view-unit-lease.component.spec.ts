import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUnitLeaseComponent } from './view-unit-lease.component';

describe('ViewUnitLeaseComponent', () => {
  let component: ViewUnitLeaseComponent;
  let fixture: ComponentFixture<ViewUnitLeaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewUnitLeaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewUnitLeaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
