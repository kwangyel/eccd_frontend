import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerBuildingsComponent } from './owner-buildings.component';

describe('OwnerBuildingsComponent', () => {
  let component: OwnerBuildingsComponent;
  let fixture: ComponentFixture<OwnerBuildingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerBuildingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnerBuildingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
