import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IotBuildingListComponent } from './iot-building-list.component';

describe('IotBuildingListComponent', () => {
  let component: IotBuildingListComponent;
  let fixture: ComponentFixture<IotBuildingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IotBuildingListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IotBuildingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
