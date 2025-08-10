import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxReportBuildingListComponent } from './tax-report-building-list.component';

describe('TaxReportBuildingListComponent', () => {
  let component: TaxReportBuildingListComponent;
  let fixture: ComponentFixture<TaxReportBuildingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxReportBuildingListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaxReportBuildingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
