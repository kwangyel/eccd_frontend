import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminateLeaseComponentComponent } from './terminate-lease-component.component';

describe('TerminateLeaseComponentComponent', () => {
  let component: TerminateLeaseComponentComponent;
  let fixture: ComponentFixture<TerminateLeaseComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerminateLeaseComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TerminateLeaseComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
