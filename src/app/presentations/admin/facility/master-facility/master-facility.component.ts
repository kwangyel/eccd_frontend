import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FacilityStatus } from 'src/app/core/constants/enums';
import { FacilityDTO } from 'src/app/core/dto/facility/facility.dto';

@Component({
  selector: 'app-master-facility',
  standalone: true,
  imports: [
    TableModule, CommonModule, ButtonModule
  ],
  templateUrl: './master-facility.component.html',
  styleUrl: './master-facility.component.scss'
})
export class MasterFacilityComponent {
  facilities: FacilityDTO[] = [];

  ngOnInit(): void {
    this.getFacilities();
  }

  openAddFacilityModal() {
  }

  getFacilities() {
    // this.facilityDataService.getFacilities().subscribe((res) => {
    //   this.facilities = res;
    // });
    this.facilities = [
      {
        id: 1,
        name: 'Facility 1',
        description: 'Description 1',
        address: 'Address 1',
        latitude: 1,
        longitude: 1,
        status: FacilityStatus.ACTIVE,
        capacity: 100,
        ownerId: 1,
      },
      {
        id: 2,
        name: 'Facility 2',
        description: 'Description 2',
        address: 'Address 2',
        latitude: 2,
        longitude: 2,
        status: FacilityStatus.ACTIVE,
        capacity: 100,
        ownerId: 1,
      },
    ];
  }
}
