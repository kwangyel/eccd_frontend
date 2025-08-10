import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerPlotsComponent } from './owner-plots.component';

describe('OwnerPlotsComponent', () => {
  let component: OwnerPlotsComponent;
  let fixture: ComponentFixture<OwnerPlotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerPlotsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnerPlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
