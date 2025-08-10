import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTenantSettingsComponent } from './admin-tenant-settings.component';

describe('AdminTenantSettingsComponent', () => {
  let component: AdminTenantSettingsComponent;
  let fixture: ComponentFixture<AdminTenantSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTenantSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminTenantSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
