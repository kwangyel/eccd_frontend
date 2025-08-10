import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerListBuildingComponent } from './owner-list-building.component';

describe('OwnerListBuildingComponent', () => {
  let component: OwnerListBuildingComponent;
  let fixture: ComponentFixture<OwnerListBuildingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerListBuildingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnerListBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
