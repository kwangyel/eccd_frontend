import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { StudentDTO } from 'src/app/core/dto/users/student.dto';

@Component({
  selector: 'app-master-student',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule],
  templateUrl: './master-student.component.html',
  styleUrl: './master-student.component.scss'
})
export class MasterStudentComponent {
  students: StudentDTO[] = [
    {
      id: 1,
      name: 'Student 1',
      preferredName: 'Student 1',
      gender: 'Male',
      dateOfBirth: new Date(),
      studentCode: '1234567890',
      parentId: 1,
      facilityId: 0
    },
    {
      id: 2,
      name: 'Student 2',
      preferredName: 'Student 2',
      gender: 'Female',
      dateOfBirth: new Date(),
      studentCode: '1234567890',
      parentId: 2,
      facilityId: 0
    },
  ];

  openAddStudentModal() {
  }
}
