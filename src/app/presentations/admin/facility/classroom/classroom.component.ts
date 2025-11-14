import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FacilityStatus } from 'src/app/core/constants/enums';
import { ClassRoomDTO } from 'src/app/core/dto/facility/facility.dto';

@Component({
  selector: 'app-classroom',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule],
  templateUrl: './classroom.component.html',
  styleUrl: './classroom.component.scss'
})
export class ClassroomComponent {
  classrooms: ClassRoomDTO[] = [];
  openAddClassroomModal(): void {
    console.log('openAddClassroomModal');
  }

  ngOnInit(): void {
    this.getClassrooms();
  }

  getClassrooms(): void {
    this.classrooms = [
      {
        id: 1,
        name: 'Classroom 1',
        description: 'Description 1',
        capacity: 10,
        facilityId: 1,
        facility: {
          id: 1,
          name: 'Facility 1',
          description: 'Description 1',
          address: 'Address 1',
          latitude: 1,
          longitude: 1,
          status: FacilityStatus.ACTIVE,
          capacity: 0,
          ownerId: 0
        },
      },
      {
        id: 2,
        name: 'Classroom 2',
        description: 'Description 2',
        capacity: 20,
        facilityId: 2,
        facility: {
          id: 2,
          name: 'Facility 2',
          description: 'Description 2',
          address: 'Address 2',
          latitude: 2,
          longitude: 2,
          status: FacilityStatus.ACTIVE,
          capacity: 0,
          ownerId: 0
        },
      },

    ];
  }
}
