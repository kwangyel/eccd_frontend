import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUnitLeaseComponent } from './create-unit-lease.component';

describe('CreateUnitLeaseComponent', () => {
  let component: CreateUnitLeaseComponent;
  let fixture: ComponentFixture<CreateUnitLeaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUnitLeaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUnitLeaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
