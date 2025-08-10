import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValveListComponent } from './valve-list.component';

describe('ValveListComponent', () => {
  let component: ValveListComponent;
  let fixture: ComponentFixture<ValveListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValveListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
