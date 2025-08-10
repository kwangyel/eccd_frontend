import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValveDetailComponent } from './valve-detail.component';

describe('ValveDetailComponent', () => {
  let component: ValveDetailComponent;
  let fixture: ComponentFixture<ValveDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValveDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValveDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
