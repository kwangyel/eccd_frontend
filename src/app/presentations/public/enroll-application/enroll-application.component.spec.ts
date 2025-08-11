import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollApplicationComponent } from './enroll-application.component';

describe('EnrollApplicationComponent', () => {
  let component: EnrollApplicationComponent;
  let fixture: ComponentFixture<EnrollApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrollApplicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnrollApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
