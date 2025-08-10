import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddListingModalComponent } from './add-listing-modal.component';

describe('AddListingModalComponent', () => {
  let component: AddListingModalComponent;
  let fixture: ComponentFixture<AddListingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddListingModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddListingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
