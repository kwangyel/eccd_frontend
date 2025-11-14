import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlStatementComponent } from './pl-statement.component';

describe('PlStatementComponent', () => {
  let component: PlStatementComponent;
  let fixture: ComponentFixture<PlStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlStatementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
