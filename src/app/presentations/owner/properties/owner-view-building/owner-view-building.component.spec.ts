import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerViewBuildingComponent } from './owner-view-building.component';

describe('OwnerViewBuildingComponent', () => {
  let component: OwnerViewBuildingComponent;
  let fixture: ComponentFixture<OwnerViewBuildingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerViewBuildingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnerViewBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
